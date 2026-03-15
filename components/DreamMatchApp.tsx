"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Flower2,
  Heart,
  Lock,
  Moon,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

type MatchProfile = {
  name: string;
  age: number;
  city: string;
  headline: string;
  bio: string;
  values: string[];
  vibes: string[];
  greenFlags: string[];
  firstDate: string;
};

type FormState = {
  name: string;
  age: string;
  city: string;
  relationshipGoal: string;
  values: string[];
  vibes: string[];
  notes: string;
  links: string;
};

const valueOptions = [
  "Kindness",
  "Ambition",
  "Emotional depth",
  "Playfulness",
  "Creativity",
  "Stability",
  "Adventure",
  "Spirituality",
  "Humor",
  "Growth",
  "Loyalty",
  "Calm energy",
];

const vibeOptions = [
  "Soft luxury",
  "Art girl / art boy",
  "Bookish romantic",
  "Wellness-coded",
  "Tech but emotionally available",
  "Mystic with boundaries",
  "Fashion-forward",
  "Low-key iconic",
  "Golden retriever energy",
  "Outdoorsy but curated",
  "Spicy but sincere",
  "Clean aesthetic",
];

const dreamMatches: MatchProfile[] = [
  {
    name: "Julian",
    age: 31,
    city: "San Francisco",
    headline: "Emotionally fluent founder energy with actual follow-through.",
    bio: "Builds thoughtful products, texts back, loves dinner parties, and wants a real relationship that feels expansive and grounded.",
    values: ["Kindness", "Ambition", "Growth"],
    vibes: ["Tech but emotionally available", "Low-key iconic", "Bookish romantic"],
    greenFlags: ["Intentional communicator", "Loves long walks + long-term plans", "Actually relationship-minded"],
    firstDate: "A candlelit wine bar, then a bookstore detour because neither of you wants the night to end.",
  },
  {
    name: "Maya",
    age: 29,
    city: "Los Angeles",
    headline: "Radiant creative with depth, discipline, and main-character softness.",
    bio: "Designs beautiful things, keeps promises, loves emotional honesty, and wants one great love instead of ten chaotic situationships.",
    values: ["Creativity", "Loyalty", "Emotional depth"],
    vibes: ["Soft luxury", "Mystic with boundaries", "Fashion-forward"],
    greenFlags: ["Clear intentions", "Warm but discerning", "Makes ordinary moments feel beautiful"],
    firstDate: "Matcha, museum wandering, and a rooftop sunset that somehow feels pre-selected by the universe.",
  },
  {
    name: "Noah",
    age: 28,
    city: "New York",
    headline: "Grounded, funny, a little dreamy, and surprisingly rare online.",
    bio: "Works hard, loves deeply, reads poetry unironically, and wants a best-friend-level relationship with chemistry that actually lasts.",
    values: ["Humor", "Loyalty", "Calm energy"],
    vibes: ["Bookish romantic", "Golden retriever energy", "Wellness-coded"],
    greenFlags: ["Not avoidant", "Plans dates well", "Comfortable with feelings"],
    firstDate: "Late brunch, a neighborhood walk, and the kind of conversation that makes you forget to check your phone.",
  },
];

const initialForm: FormState = {
  name: "",
  age: "",
  city: "",
  relationshipGoal: "",
  values: [],
  vibes: [],
  notes: "",
  links: "",
};

function ChipSelector({
  options,
  selected,
  setSelected,
  max = 3,
}: {
  options: string[];
  selected: string[];
  setSelected: (next: string[]) => void;
  max?: number;
}) {
  return (
    <div className="chip-grid">
      {options.map((option) => {
        const active = selected.includes(option);
        const disabled = !active && selected.length >= max;

        return (
          <button
            key={option}
            type="button"
            className={`chip ${active ? "chip-active" : ""}`}
            disabled={disabled}
            onClick={() => {
              if (active) {
                setSelected(selected.filter((item) => item !== option));
              } else if (!disabled) {
                setSelected([...selected, option]);
              }
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

function InfoCard({
  icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  const Icon = icon;

  return (
    <div className="panel soft-panel">
      <Icon className="panel-icon" />
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}

function StepCard({
  eyebrow,
  title,
  description,
  progress,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  progress: number;
  children: React.ReactNode;
}) {
  return (
    <section className="card-shell">
      <div className="step-header">
        <div>
          <div className="eyebrow">{eyebrow}</div>
          <h2>{title}</h2>
          <p className="step-copy">{description}</p>
        </div>
        <div className="progress-badge">{progress}% complete</div>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div>{children}</div>
    </section>
  );
}

function TrustScreen({
  agreed18,
  setAgreed18,
  agreedConsent,
  setAgreedConsent,
  ageVerified,
  setAgeVerified,
  onNext,
}: {
  agreed18: boolean;
  setAgreed18: (value: boolean) => void;
  agreedConsent: boolean;
  setAgreedConsent: (value: boolean) => void;
  ageVerified: boolean;
  setAgeVerified: (value: boolean) => void;
  onNext: () => void;
}) {
  const ready = agreed18 && agreedConsent && ageVerified;

  return (
    <StepCard
      eyebrow="Trust first"
      title="Cute, mysterious, and serious about safety 🔐"
      description="Before the sparkle, the grown-up part: Dream Match is 18+, consent-based, privacy-forward, and designed to protect data while helping people find one aligned person."
      progress={20}
    >
      <div className="two-col">
        <div className="stack-lg">
          <InfoCard
            icon={ShieldCheck}
            title="18+ only"
            body="This prototype is designed for adults seeking real long-term relationships."
          />
          <InfoCard
            icon={Search}
            title="Consent-based signal reading"
            body="We only use the data you choose to provide in order to generate a single compatibility prediction."
          />
          <InfoCard
            icon={Lock}
            title="Security-forward product thinking"
            body="The production version should add real auth, encrypted storage, verified identity, consent records, reporting, and moderation."
          />
        </div>

        <div className="panel consent-panel">
          <h3>Consent checkpoint ✨</h3>
          <p>
            You stay in control of your data, your notes, and whether you move
            forward after your match is revealed.
          </p>

          <label className="check-row">
            <input
              type="checkbox"
              checked={agreed18}
              onChange={(event) => setAgreed18(event.target.checked)}
            />
            <span>I confirm I am 18 or older.</span>
          </label>

          <label className="check-row">
            <input
              type="checkbox"
              checked={agreedConsent}
              onChange={(event) => setAgreedConsent(event.target.checked)}
            />
            <span>I consent to matching analysis of the information I submit.</span>
          </label>

          <label className="check-row">
            <input
              type="checkbox"
              checked={ageVerified}
              onChange={(event) => setAgeVerified(event.target.checked)}
            />
            <span>Age verification complete (demo mode).</span>
          </label>

          <button className="primary-btn full-width" disabled={!ready} onClick={onNext}>
            Continue <ArrowRight className="inline-icon" />
          </button>
        </div>
      </div>
    </StepCard>
  );
}

function Onboarding({
  form,
  setForm,
  onBack,
  onNext,
}: {
  form: FormState;
  setForm: (form: FormState) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const canContinue =
    form.name.trim() &&
    form.age.trim() &&
    form.city.trim() &&
    form.relationshipGoal.trim() &&
    form.values.length > 0 &&
    form.vibes.length > 0;

  return (
    <StepCard
      eyebrow="Profile energy"
      title="Tell us who you are — not just what you look like 💗"
      description="The best match comes from values, vibe, life direction, and the things people only learn once they actually know you."
      progress={55}
    >
      <div className="two-col wide-left">
        <div className="stack-lg">
          <div className="field-grid two-up">
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="Ava"
              />
            </div>
            <div className="field">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                value={form.age}
                onChange={(event) => setForm({ ...form, age: event.target.value })}
                placeholder="28"
                inputMode="numeric"
              />
            </div>
          </div>

          <div className="field-grid two-up">
            <div className="field">
              <label htmlFor="city">City</label>
              <input
                id="city"
                value={form.city}
                onChange={(event) => setForm({ ...form, city: event.target.value })}
                placeholder="San Francisco"
              />
            </div>
            <div className="field">
              <label htmlFor="goal">Looking for</label>
              <select
                id="goal"
                value={form.relationshipGoal}
                onChange={(event) =>
                  setForm({ ...form, relationshipGoal: event.target.value })
                }
              >
                <option value="">Choose one</option>
                <option value="Long-term relationship">Long-term relationship</option>
                <option value="Life partner energy">Life partner energy</option>
                <option value="Intentional dating">Intentional dating</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label>Top values</label>
            <ChipSelector
              options={valueOptions}
              selected={form.values}
              setSelected={(values) => setForm({ ...form, values })}
            />
          </div>

          <div className="field">
            <label>Your vibe in three taps</label>
            <ChipSelector
              options={vibeOptions}
              selected={form.vibes}
              setSelected={(vibes) => setForm({ ...form, vibes })}
            />
          </div>

          <div className="field">
            <label htmlFor="notes">Dream relationship notes</label>
            <textarea
              id="notes"
              value={form.notes}
              onChange={(event) => setForm({ ...form, notes: event.target.value })}
              placeholder="I want something emotionally mature, playful, deeply affectionate, and actually mutual..."
            />
          </div>

          <div className="field">
            <label htmlFor="links">Optional links</label>
            <input
              id="links"
              value={form.links}
              onChange={(event) => setForm({ ...form, links: event.target.value })}
              placeholder="Instagram, LinkedIn, portfolio, Substack, etc."
            />
          </div>

          <div className="button-row">
            <button className="secondary-btn" onClick={onBack}>
              <ArrowLeft className="inline-icon" /> Back
            </button>
            <button className="primary-btn" disabled={!canContinue} onClick={onNext}>
              Analyze my vibe <ArrowRight className="inline-icon" />
            </button>
          </div>
        </div>

        <div className="panel gradient-panel">
          <h3>What the algorithm cares about 🔮</h3>
          <p>
            Not just attraction. We are looking for the shape of a life that fits
            with yours.
          </p>
          <div className="stack-md top-space">
            <div className="soft-list-item">
              <strong>Values alignment</strong>
              <span>How you love, decide, and build a future.</span>
            </div>
            <div className="soft-list-item">
              <strong>Communication style</strong>
              <span>Warmth, honesty, pace, and emotional fluency.</span>
            </div>
            <div className="soft-list-item">
              <strong>Aesthetic resonance</strong>
              <span>Shared vibe without becoming the same person.</span>
            </div>
            <div className="soft-list-item">
              <strong>Long-term intent</strong>
              <span>Someone who genuinely wants one person.</span>
            </div>
          </div>
        </div>
      </div>
    </StepCard>
  );
}

function pickMatch(form: FormState): MatchProfile {
  const normalized = `${form.values.join("|")}|${form.vibes.join("|")}|${form.city}|${form.name}|${form.notes}`;
  const score = normalized.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return dreamMatches[score % dreamMatches.length];
}

function Processing({
  name,
  onBack,
  onReveal,
}: {
  name: string;
  onBack: () => void;
  onReveal: () => void;
}) {
  const [percent, setPercent] = useState(16);

  useEffect(() => {
    const steps = [27, 41, 58, 72, 86, 100];
    let index = 0;
    const timer = window.setInterval(() => {
      setPercent(steps[index]);
      index += 1;
      if (index >= steps.length) {
        window.clearInterval(timer);
      }
    }, 450);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (percent === 100) {
      const timeout = window.setTimeout(onReveal, 700);
      return () => window.clearTimeout(timeout);
    }
  }, [onReveal, percent]);

  const checkpoints = [
    "Parsing long-form notes",
    "Comparing value clusters",
    "Checking long-term intent",
    "Generating reveal copy",
  ];

  return (
    <StepCard
      eyebrow="The mysterious part"
      title="Let the algorithm cook ✨"
      description={`Reading ${name || "your"} notes, value clusters, aesthetic signal, and relationship intent to find one high-probability match.`}
      progress={78}
    >
      <div className="two-col">
        <div className="panel dark-panel">
          <div className="dark-label">
            <Sparkles className="inline-icon" /> Dream Match engine running
          </div>
          <div className="big-number">{percent}%</div>
          <p className="dark-copy">
            Identifying emotional fit, future pacing, attraction patterns, and the
            kind of chemistry that feels calm instead of chaotic.
          </p>
          <div className="progress-track dark-track">
            <div className="progress-fill" style={{ width: `${percent}%` }} />
          </div>
          <div className="checkpoint-grid">
            {checkpoints.map((item, index) => (
              <div key={item} className="checkpoint-card">
                <CheckCircle2
                  className={`checkpoint-icon ${percent > (index + 1) * 20 ? "checkpoint-on" : ""}`}
                />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="stack-lg">
          <div className="panel soft-panel">
            <h3>Why this feels different</h3>
            <p>No feeds. No rankings. No fake abundance.</p>
            <p>One match means less noise and more emotional clarity.</p>
            <p>The goal is to get you back to life, not keep you scrolling.</p>
          </div>
          <button className="secondary-btn full-width" onClick={onBack}>
            Back
          </button>
        </div>
      </div>
    </StepCard>
  );
}

function Reveal({
  form,
  onRestart,
}: {
  form: FormState;
  onRestart: () => void;
}) {
  const match = useMemo(() => pickMatch(form), [form]);
  const overlapValues = match.values.filter((value) => form.values.includes(value));
  const overlapVibes = match.vibes.filter((value) => form.vibes.includes(value));

  return (
    <StepCard
      eyebrow="The reveal"
      title="Your dream match is here 💘"
      description="One introduction. One actual possibility. One beautifully specific yes to explore."
      progress={100}
    >
      <div className="two-col wide-left">
        <div className="panel reveal-card">
          <div className="avatar-band" />
          <div className="avatar-badge">{match.name.charAt(0)}</div>
          <div className="reveal-top">
            <div>
              <h3 className="reveal-name">
                {match.name}, {match.age}
              </h3>
              <p className="muted">{match.city}</p>
            </div>
            <div className="success-pill">High-signal fit</div>
          </div>
          <p className="reveal-headline">{match.headline}</p>
          <p className="reveal-bio">{match.bio}</p>

          <div className="field-grid two-up top-space">
            <div className="soft-list-block pink-block">
              <div className="block-title">
                <Heart className="inline-icon" /> Why you align
              </div>
              <ul>
                <li>
                  Shared values: {overlapValues.length ? overlapValues.join(", ") : match.values.join(", ")}
                </li>
                <li>
                  Compatible vibe: {overlapVibes.length ? overlapVibes.join(", ") : match.vibes.slice(0, 2).join(", ")}
                </li>
                <li>Matched around long-term intent, emotional pacing, and conversational chemistry.</li>
              </ul>
            </div>
            <div className="soft-list-block violet-block">
              <div className="block-title">
                <Flower2 className="inline-icon" /> Green flags
              </div>
              <ul>
                {match.greenFlags.map((flag) => (
                  <li key={flag}>{flag}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="soft-list-block neutral-block top-space">
            <div className="block-title">
              <Moon className="inline-icon" /> First date prediction
            </div>
            <p>{match.firstDate}</p>
          </div>

          <div className="button-row top-space">
            <button className="primary-btn">Accept introduction</button>
            <button className="secondary-btn">Save and think about it</button>
          </div>
        </div>

        <div className="stack-lg">
          <div className="panel green-panel">
            <h3>What happens next</h3>
            <p>The product’s job is to get out of the way and let real life begin.</p>
            <div className="stack-md top-space">
              <div className="soft-list-item">1. You accept the introduction.</div>
              <div className="soft-list-item">2. Your match accepts too.</div>
              <div className="soft-list-item">3. Dream Match opens a simple handoff with a conversation starter and scheduling nudge.</div>
              <div className="soft-list-item">4. You move on to living your best life and enjoying your love life. ✨</div>
            </div>
          </div>

          <div className="panel soft-panel">
            <h3>Prototype notes</h3>
            <p>This repo is a front-end concept app built from the design doc.</p>
            <p>The matching engine is demo logic with a stylish reveal layer.</p>
            <p>Production version would add auth, real verification, consent records, encrypted storage, and a true matching backend.</p>
          </div>

          <button className="secondary-btn full-width" onClick={onRestart}>
            Start over
          </button>
        </div>
      </div>
    </StepCard>
  );
}

export default function DreamMatchApp() {
  const [step, setStep] = useState<"home" | "trust" | "onboarding" | "processing" | "reveal">("home");
  const [agreed18, setAgreed18] = useState(false);
  const [agreedConsent, setAgreedConsent] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);

  return (
    <div className="page-bg">
      <div className="container">
        <header className="site-header">
          <div className="brand-row">
            <div className="brand-mark">
              <Sparkles className="brand-icon" />
            </div>
            <div>
              <div className="brand-name">Dream Match</div>
              <div className="brand-tagline">
                Living your best life and enjoying your love life ✨🔮
              </div>
            </div>
          </div>
          <div className="pill-row">
            <span className="tiny-pill">Gen Z + Millennial</span>
            <span className="tiny-pill pink-pill">One match only</span>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {step === "home" && (
            <motion.section
              key="home"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              className="hero-shell"
            >
              <div className="hero-grid">
                <div>
                  <div className="pill-row hero-pills">
                    <span className="tiny-pill dark-pill">Chrome-based ✨</span>
                    <span className="tiny-pill">18+ age-verified</span>
                    <span className="tiny-pill">Free & open source</span>
                  </div>

                  <h1>
                    One match.
                    <br />
                    <span className="gradient-text">That’s the point.</span>
                  </h1>

                  <p className="hero-copy">
                    Dream Match finds exactly <strong>one</strong> person worth meeting
                    using your values, vibe, long-form notes, and a quietly mysterious
                    compatibility engine. No swipe spiral. No dating-app chaos. Just a
                    clean path toward real love. ✨🔮
                  </p>

                  <div className="button-row top-space">
                    <button className="primary-btn" onClick={() => setStep("trust")}>
                      Meet my dream match <ArrowRight className="inline-icon" />
                    </button>
                    <button className="secondary-btn">See how it works</button>
                  </div>

                  <div className="info-grid top-space-lg">
                    <InfoCard
                      icon={Sparkles}
                      title="Exactly one match"
                      body="No hundreds of maybe’s. One thoughtful introduction."
                    />
                    <InfoCard
                      icon={ShieldCheck}
                      title="Privacy-first"
                      body="Age-gated, consent-based, and security-forward by design."
                    />
                    <InfoCard
                      icon={Heart}
                      title="Real relationship energy"
                      body="Built for long-term connection, not engagement loops."
                    />
                  </div>
                </div>

                <div className="panel preview-panel">
                  <div className="panel-tag">
                    <Moon className="inline-icon" /> Compatibility preview
                  </div>
                  <h3>Your dream match is almost ready</h3>
                  <p>
                    We read for emotional tone, values alignment, aesthetic resonance,
                    and relationship intent, then return one high-signal introduction.
                  </p>

                  <div className="signal-box top-space">
                    <div className="panel-tag pink-tag">
                      <Star className="inline-icon" /> Signal clusters detected
                    </div>
                    <div className="signal-grid">
                      <div className="signal-card">
                        <span>Emotional depth</span>
                        <strong>High</strong>
                      </div>
                      <div className="signal-card">
                        <span>Long-term intent</span>
                        <strong>High</strong>
                      </div>
                      <div className="signal-card">
                        <span>Aesthetic sync</span>
                        <strong>Medium-high</strong>
                      </div>
                      <div className="signal-card">
                        <span>Conversation chemistry</span>
                        <strong>High</strong>
                      </div>
                    </div>
                  </div>

                  <div className="dark-subpanel top-space">
                    <div className="panel-tag subtle-light">
                      <Lock className="inline-icon" /> Safety baked in
                    </div>
                    <p>
                      18+ verification, consented data usage, encrypted-storage-ready
                      architecture, reporting tools, and no creepy feed mechanics.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {step === "trust" && (
            <motion.div key="trust" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}>
              <TrustScreen
                agreed18={agreed18}
                setAgreed18={setAgreed18}
                agreedConsent={agreedConsent}
                setAgreedConsent={setAgreedConsent}
                ageVerified={ageVerified}
                setAgeVerified={setAgeVerified}
                onNext={() => setStep("onboarding")}
              />
            </motion.div>
          )}

          {step === "onboarding" && (
            <motion.div key="onboarding" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}>
              <Onboarding
                form={form}
                setForm={setForm}
                onBack={() => setStep("trust")}
                onNext={() => setStep("processing")}
              />
            </motion.div>
          )}

          {step === "processing" && (
            <motion.div key="processing" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}>
              <Processing
                name={form.name}
                onBack={() => setStep("onboarding")}
                onReveal={() => setStep("reveal")}
              />
            </motion.div>
          )}

          {step === "reveal" && (
            <motion.div key="reveal" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}>
              <Reveal
                form={form}
                onRestart={() => {
                  setAgreed18(false);
                  setAgreedConsent(false);
                  setAgeVerified(false);
                  setForm(initialForm);
                  setStep("home");
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
