import { Calculator, Check, Copy, Leaf, Share2, Sparkles, Wallet } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

type FormState = {
  goal: number;
  weekdays: number;
  weekendMeals: number;
  delivery: number;
  groceries: number;
  cafe: number;
  people: number;
};

type Result = {
  monthlyTotal: number;
  dailyAverage: number;
  gap: number;
  grade: "good" | "watch" | "over";
  routine: string;
  checklist: string[];
  savingTips: string[];
};

const initialForm: FormState = {
  goal: 450000,
  weekdays: 5,
  weekendMeals: 3,
  delivery: 2,
  groceries: 90000,
  cafe: 4,
  people: 1,
};

const money = new Intl.NumberFormat("ko-KR");

function calculate(form: FormState): Result {
  const weekdayMealCost = form.weekdays * 9000 * 4.34;
  const weekendMealCost = form.weekendMeals * 12000 * 4.34;
  const deliveryCost = form.delivery * 18000 * 4.34;
  const groceryCost = form.groceries * 4.34;
  const cafeCost = form.cafe * 5500 * 4.34;
  const monthlyTotal = Math.round(
    (weekdayMealCost + weekendMealCost + deliveryCost + groceryCost + cafeCost) / Math.max(form.people, 1),
  );
  const dailyAverage = Math.round(monthlyTotal / 30);
  const gap = form.goal - monthlyTotal;
  const ratio = monthlyTotal / form.goal;
  const grade = ratio <= 0.92 ? "good" : ratio <= 1.08 ? "watch" : "over";

  const routine =
    grade === "good"
      ? "현재 루틴은 예산 안에 들어옵니다. 주 1회 장보기와 외식 기록만 유지해도 충분합니다."
      : grade === "watch"
        ? "예산 근처입니다. 배달 1회와 카페 1회를 줄이면 안정권으로 내려갈 가능성이 큽니다."
        : "예산 초과입니다. 평일 점심 2회 도시락, 배달 1회 감축, 주간 장보기 상한선을 먼저 잡아보세요.";

  const checklist = [
    "이번 주 단백질 2종 정하기",
    "냉동 보관 가능한 식재료 1개 담기",
    "배달 대체용 즉석 식사 2개 준비",
    "카페 대신 마실 음료 1종 챙기기",
    "영수증 또는 카드앱에서 식비만 따로 확인하기",
  ];

  const savingTips = [
    `배달을 주 1회 줄이면 월 약 ${money.format(Math.round(18000 * 4.34))}원을 아낄 수 있어요.`,
    `카페를 주 2회 줄이면 월 약 ${money.format(Math.round(5500 * 2 * 4.34))}원을 줄일 수 있어요.`,
    "장보기 예산은 월 단위보다 주 단위로 나누면 초과를 더 빨리 발견할 수 있어요.",
  ];

  return { monthlyTotal, dailyAverage, gap, grade, routine, checklist, savingTips };
}

function App() {
  const [form, setForm] = useState<FormState>(() => {
    const saved = localStorage.getItem("sikbifit-form");
    return saved ? { ...initialForm, ...JSON.parse(saved) } : initialForm;
  });
  const [copied, setCopied] = useState(false);
  const result = useMemo(() => calculate(form), [form]);

  function updateField(key: keyof FormState, value: number) {
    const next = { ...form, [key]: Number.isFinite(value) ? value : 0 };
    setForm(next);
    localStorage.setItem("sikbifit-form", JSON.stringify(next));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    document.getElementById("result")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function shareResult() {
    const text = `식비핏 결과: 내 예상 월 식비는 ${money.format(result.monthlyTotal)}원, 목표 대비 ${
      result.gap >= 0 ? money.format(result.gap) + "원 여유" : money.format(Math.abs(result.gap)) + "원 초과"
    }입니다.`;

    if (navigator.share) {
      await navigator.share({ title: "식비핏 월 식비 계산 결과", text, url: location.href });
      return;
    }

    await navigator.clipboard.writeText(`${text} ${location.href}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main>
      <section className="hero">
        <nav className="topbar" aria-label="주요 메뉴">
          <a className="brand" href="/">
            <Wallet size={22} aria-hidden="true" />
            식비핏
          </a>
          <a className="nav-link" href="#faq">FAQ</a>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">월 식비 예산 계산기</p>
            <h1>이번 달 식비, 예산 안에 들어올까요?</h1>
            <p>
              외식, 배달, 장보기, 카페 패턴만 입력하면 월 예상 식비와 바로 실행할 수 있는 절약 루틴을 계산합니다.
            </p>
          </div>

          <form className="calculator" onSubmit={handleSubmit} aria-label="식비 계산 입력 폼">
            <label>
              목표 월 식비
              <input
                type="number"
                min="100000"
                step="10000"
                value={form.goal}
                onChange={(event) => updateField("goal", Number(event.target.value))}
              />
            </label>
            <label>
              평일 외식 횟수 / 주
              <input
                type="number"
                min="0"
                max="21"
                value={form.weekdays}
                onChange={(event) => updateField("weekdays", Number(event.target.value))}
              />
            </label>
            <label>
              주말 외식 횟수 / 주
              <input
                type="number"
                min="0"
                max="12"
                value={form.weekendMeals}
                onChange={(event) => updateField("weekendMeals", Number(event.target.value))}
              />
            </label>
            <label>
              배달 횟수 / 주
              <input
                type="number"
                min="0"
                max="14"
                value={form.delivery}
                onChange={(event) => updateField("delivery", Number(event.target.value))}
              />
            </label>
            <label>
              주간 장보기 예산
              <input
                type="number"
                min="0"
                step="5000"
                value={form.groceries}
                onChange={(event) => updateField("groceries", Number(event.target.value))}
              />
            </label>
            <label>
              카페 횟수 / 주
              <input
                type="number"
                min="0"
                max="21"
                value={form.cafe}
                onChange={(event) => updateField("cafe", Number(event.target.value))}
              />
            </label>
            <label>
              함께 쓰는 인원
              <input
                type="number"
                min="1"
                max="6"
                value={form.people}
                onChange={(event) => updateField("people", Number(event.target.value))}
              />
            </label>
            <button className="primary" type="submit">
              <Calculator size={18} aria-hidden="true" />
              식비 계산하기
            </button>
          </form>
        </div>
      </section>

      <section className="result-band" id="result">
        <div className={`result-card ${result.grade}`}>
          <div>
            <p className="eyebrow">예상 월 식비</p>
            <strong>{money.format(result.monthlyTotal)}원</strong>
            <span>하루 평균 {money.format(result.dailyAverage)}원</span>
          </div>
          <div>
            <p className="eyebrow">목표 대비</p>
            <strong>{result.gap >= 0 ? `${money.format(result.gap)}원 여유` : `${money.format(Math.abs(result.gap))}원 초과`}</strong>
            <span>{result.routine}</span>
          </div>
          <button className="icon-button" onClick={shareResult} aria-label="결과 공유하기">
            {copied ? <Copy size={18} aria-hidden="true" /> : <Share2 size={18} aria-hidden="true" />}
            {copied ? "복사됨" : "공유"}
          </button>
        </div>
      </section>

      <section className="content-grid">
        <article>
          <div className="section-title">
            <Sparkles size={20} aria-hidden="true" />
            <h2>이번 달 절약 힌트</h2>
          </div>
          <ul className="clean-list">
            {result.savingTips.map((tip) => (
              <li key={tip}>
                <Check size={18} aria-hidden="true" />
                {tip}
              </li>
            ))}
          </ul>
        </article>

        <article>
          <div className="section-title">
            <Leaf size={20} aria-hidden="true" />
            <h2>장보기 체크리스트</h2>
          </div>
          <ul className="checklist">
            {result.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <aside className="ad-slot" aria-label="광고 영역">
        <span>AdSense 준비 영역</span>
        <p>결과를 확인한 뒤 자연스럽게 노출되는 반응형 광고 자리입니다.</p>
      </aside>

      <section className="cta">
        <div>
          <p className="eyebrow">수익화 실험 CTA</p>
          <h2>장보기 루틴을 더 쉽게 만들고 싶다면</h2>
          <p>밀프렙 용기, 냉동 식재료, 예산 장보기 앱 제휴 링크를 연결할 수 있는 영역입니다.</p>
        </div>
        <a href="mailto:hello@example.com?subject=식비핏 제휴 문의">제휴 문의</a>
      </section>

      <section className="faq" id="faq">
        <h2>자주 묻는 질문</h2>
        <details>
          <summary>식비 계산 기준은 무엇인가요?</summary>
          <p>평일 외식 9,000원, 주말 외식 12,000원, 배달 18,000원, 카페 5,500원을 기본값으로 계산합니다.</p>
        </details>
        <details>
          <summary>입력한 정보가 서버에 저장되나요?</summary>
          <p>아니요. 결과 편의를 위해 브라우저 localStorage에만 저장되며 별도 서버로 전송하지 않습니다.</p>
        </details>
        <details>
          <summary>자취생이 아니어도 사용할 수 있나요?</summary>
          <p>가능합니다. 직장인, 신혼부부, 1인 가구, 룸메이트 생활비 점검에도 쓸 수 있습니다.</p>
        </details>
      </section>
    </main>
  );
}

export default App;
