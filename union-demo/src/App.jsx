import { useState } from "react";

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  textarea:focus { outline: none; border-color: #0F1F3D !important; }
  input:focus { outline: none; border-color: #0F1F3D !important; }
  button:focus { outline: none; }
  ::placeholder { color: #C0BDB8; }
`;

const categories = {
  conflict:    { label: "Conflict",     color: "#8B1A1A", bg: "#FDF0F0" },
  environment: { label: "Environment",  color: "#1A6B35", bg: "#F0FDF4" },
  economy:     { label: "Economy",      color: "#1A3A6B", bg: "#F0F4FD" },
  governance:  { label: "Governance",   color: "#6B3A1A", bg: "#FDF4F0" },
  humanRights: { label: "Human Rights", color: "#6B1A6A", bg: "#FDF0FD" },
};

const questions = [
  { id: 1,  ring: "global",   category: "conflict",    question: "Do you believe your government's stated reasons for military involvement in active conflicts reflect the truth?",                        responses: 47832, directlyAffected: 12441, timeAgo: "14 hours ago", poll: { yes: 18, no: 67, unsure: 15 } },
  { id: 2,  ring: "global",   category: "environment", question: "Has climate change directly altered how you grow, find, or afford food in the last two years?",                                         responses: 31204, directlyAffected: 19882, timeAgo: "1 day ago",    poll: { yes: 71, no: 22, unsure: 7  } },
  { id: 3,  ring: "global",   category: "governance",  question: "Do you trust the news sources available in your country to report facts without political influence?",                                   responses: 28917, directlyAffected: 28917, timeAgo: "2 days ago",  poll: { yes: 14, no: 79, unsure: 7  } },
  { id: 8,  ring: "global",   category: "economy",     question: "Should corporations generating billions in annual profit be legally required to pay every employee a living wage?",                      responses: 52441, directlyAffected: 38920, timeAgo: "6 hours ago",  poll: { yes: 84, no: 10, unsure: 6  } },
  { id: 9,  ring: "global",   category: "conflict",    question: "Should soldiers have the legal right to refuse deployment to conflicts they personally believe are unjust or unlawful?",                responses: 41203, directlyAffected: 18441, timeAgo: "8 hours ago",  poll: { yes: 71, no: 18, unsure: 11 } },
  { id: 10, ring: "global",   category: "humanRights", question: "Do large technology corporations have too much influence over public opinion and democratic processes?",                                  responses: 33892, directlyAffected: 33892, timeAgo: "10 hours ago", poll: { yes: 78, no: 12, unsure: 10 } },
  { id: 11, ring: "global",   category: "economy",     question: "Should there be a legally enforced maximum ratio between a CEO's compensation and the lowest paid worker in their company?",            responses: 29104, directlyAffected: 21003, timeAgo: "1 day ago",    poll: { yes: 76, no: 16, unsure: 8  } },
  { id: 12, ring: "global",   category: "humanRights", question: "Do you believe every person on earth has a right to clean drinking water regardless of their ability to pay for it?",                   responses: 61032, directlyAffected: 44201, timeAgo: "2 days ago",  poll: { yes: 96, no: 2,  unsure: 2  } },
  { id: 4,  ring: "regional", category: "economy",     question: "Should developers be legally required to include affordable housing in all new residential projects over 50 units?",                    responses: 8341,  directlyAffected: 5102,  timeAgo: "3 hours ago",  poll: { yes: 84, no: 9,  unsure: 7  } },
  { id: 5,  ring: "regional", category: "governance",  question: "Do you feel your municipal government meaningfully consults residents before approving major development projects?",                      responses: 5892,  directlyAffected: 5892,  timeAgo: "6 hours ago",  poll: { yes: 11, no: 82, unsure: 7  } },
  { id: 13, ring: "regional", category: "economy",     question: "Should large retail corporations operating in your region be required to source a minimum percentage of products locally?",              responses: 4102,  directlyAffected: 4102,  timeAgo: "4 hours ago",  poll: { yes: 67, no: 22, unsure: 11 } },
  { id: 6,  ring: "local",    category: "economy",     question: "Is public transit in your city adequate for your daily commute needs?",                                                                  responses: 2104,  directlyAffected: 2104,  timeAgo: "5 hours ago",  poll: { yes: 28, no: 61, unsure: 11 } },
  { id: 7,  ring: "local",    category: "humanRights", question: "Do you feel safe reporting local crimes or concerns to law enforcement without fear of retaliation?",                                   responses: 1847,  directlyAffected: 1847,  timeAgo: "8 hours ago",  poll: { yes: 44, no: 42, unsure: 14 } },
  { id: 14, ring: "local",    category: "governance",  question: "Does your city invest public money in ways that reflect the priorities of ordinary residents rather than developers and corporations?",  responses: 1203,  directlyAffected: 1203,  timeAgo: "2 hours ago",  poll: { yes: 19, no: 68, unsure: 13 } },
];

const archivedQuestions = [
  { id: 201, ring: "global",   category: "conflict",    closedDate: "May 14, 2026", question: "Do you believe the United Nations has the authority and will to prevent future wars?",                              responses: 88341, directlyAffected: 31204, poll: { yes: 12, no: 76, unsure: 12 } },
  { id: 202, ring: "global",   category: "environment", closedDate: "May 2, 2026",  question: "Should governments ban the sale of petrol and diesel vehicles by 2030?",                                          responses: 74102, directlyAffected: 74102, poll: { yes: 58, no: 31, unsure: 11 } },
  { id: 203, ring: "global",   category: "economy",     closedDate: "Apr 19, 2026", question: "Should billionaires exist?",                                                                                       responses: 102441, directlyAffected: 102441, poll: { yes: 11, no: 81, unsure: 8 } },
  { id: 204, ring: "global",   category: "humanRights", closedDate: "Apr 4, 2026",  question: "Should every nation provide a universal basic income to all citizens?",                                           responses: 69203, directlyAffected: 69203, poll: { yes: 62, no: 27, unsure: 11 } },
  { id: 205, ring: "regional", category: "governance",  closedDate: "May 20, 2026", question: "Should Ontario hold a referendum before proceeding with any major highway expansion through protected greenspace?", responses: 11032, directlyAffected: 11032, poll: { yes: 79, no: 13, unsure: 8  } },
  { id: 206, ring: "local",    category: "economy",     closedDate: "May 18, 2026", question: "Should Toronto implement a vacancy tax on residential properties left empty for more than six months?",            responses: 3841,  directlyAffected: 3841,  poll: { yes: 88, no: 8,  unsure: 4  } },
];

const voices = [
  {
    id: 101, ring: "global", category: "conflict",
    headline: "I Have Treated Wounds on Both Sides of This Border. The Soldiers Are All Afraid of the Same Things.",
    preview: "I am a field surgeon. In fourteen years I have operated in six conflict zones. What I can tell you, with certainty, is that the bodies on my table do not know what they are fighting for.",
    signature: "M. Okafor", region: "Juba, South Sudan", timeAgo: "2 hours ago", readTime: "6 min read", upvotes: 14882,
    gradient: "linear-gradient(135deg, #8B1A1A 0%, #3D0A0A 100%)",
    body: [
      "I am a field surgeon. In fourteen years I have operated in six conflict zones across three continents. I have worked in government hospitals, field tents, converted schools and the back of trucks. I have treated soldiers from armies that are enemies of each other. I have, on more than one occasion, had patients from opposing sides lying on tables three feet apart.",
      "What I can tell you, with certainty, is that the bodies on my table do not know what they are fighting for.",
      "I do not mean this politically. I mean it literally. I have asked. In the hours after surgery when the shock fades and the morphine loosens the tongue, I have had conversations with young men from both sides of the same conflict. They speak differently. They have been told different things. But they are afraid of the same things. They miss the same things. They regret the same things.",
      "One thing I have never heard — not once in fourteen years — is a soldier who fully believed the official reason he was there.",
      "This is not an anti-war statement. This is a medical observation. The distance between the people who start wars and the people who fight them is not measured in kilometres. It is measured in what each group stands to lose. The people who declare wars lose nothing on my table. The people on my table lose everything.",
      "I am writing this not because I have a solution. I am writing it because I have been in those rooms and the world has not, and I believe the world should know what it looks like when the stated reasons for a conflict meet the human cost of one.",
    ],
    spawnedQuestion: 1,
  },
  {
    id: 102, ring: "global", category: "environment",
    headline: "My Family Has Farmed This Land for Four Generations. Last Summer We Lost Everything.",
    preview: "My grandfather built this farm without electricity or running water. He survived drought, revolution and poverty. What he could not have survived is what happened to our soil last summer.",
    signature: "R. Castellanos", region: "Oaxaca, Mexico", timeAgo: "1 day ago", readTime: "8 min read", upvotes: 11203,
    gradient: "linear-gradient(135deg, #1A6B35 0%, #0A3018 100%)",
    body: [
      "My grandfather built this farm without electricity or running water. He survived drought, revolution and poverty and still managed to pass something on to my father, who passed it to me. Four generations. The same soil. The same sky.",
      "Last summer that ended.",
      "It did not end dramatically. There was no single disaster I can point to. The rains came but they came wrong — too fast, then not at all. The soil that my grandfather spent decades building lost its ability to hold water. The crops that my father grew without pesticide his entire life were attacked by insects we have never seen here before. Our yield was eighteen percent of a normal year.",
      "The government sent a representative. He told us this was a temporary setback. He used that exact phrase. Temporary setback. He was wearing new boots.",
      "I want to tell you what climate change looks like when it is not a graph on a screen. It looks like my youngest daughter asking why we are not eating dinner yet. It looks like a conversation with your wife at two in the morning about whether you sell the land your great-grandfather cleared with his hands. It looks like watching your neighbours leave and knowing you understand why.",
      "I am not a scientist. I cannot tell you the parts per million of carbon in the atmosphere. I can tell you what four generations of knowledge about one piece of land tells me: something has changed that we did not change, and we are paying for it with everything we have.",
    ],
    spawnedQuestion: 2,
  },
  {
    id: 103, ring: "regional", category: "economy",
    headline: "I've Worked in Housing Development for Twenty Years. Here's What Nobody Is Telling You About the Affordability Crisis.",
    preview: "I have sat in rooms where decisions are made about your neighbourhood. I have watched approvals get granted and rejected. I want to tell you what I have seen, because the public version of this story is missing most of what actually happens.",
    signature: "Anonymous · Ontario", region: "Ontario, Canada", timeAgo: "5 hours ago", readTime: "5 min read", upvotes: 3841,
    gradient: "linear-gradient(135deg, #1A3A6B 0%, #0A1A35 100%)",
    body: [
      "I have asked to remain anonymous. I still work in this industry and what I am about to write will not make me popular with the people who sign my contracts. I am writing it anyway because I am tired of watching the public conversation about housing affordability miss the point entirely.",
      "The crisis is not about a lack of land. It is not about construction costs, though those are real. It is not primarily about interest rates or immigration or any of the other explanations you have been offered.",
      "It is about what happens in the rooms the public never enters.",
      "I have been in those rooms. I have watched applications that would have added hundreds of units of affordable housing get quietly restructured after conversations that do not appear in any public record. I have seen approval timelines that stretch to years for projects that compete with existing interests, and timelines that compress to months for projects that do not.",
      "I am not saying there is a conspiracy. What I am saying is that the system responds to financial pressure the way water responds to gravity. It finds the path of least resistance, and the path of least resistance runs through the people who have enough resources to apply pressure in the right places.",
      "The people who cannot afford housing do not have lobbyists. The people who profit from housing unaffordability do. That asymmetry is the entire story. Everything else is detail.",
    ],
    spawnedQuestion: 4,
  },
  {
    id: 104, ring: "local", category: "governance",
    headline: "I Attended Every City Council Meeting for a Full Year. This Is What I Actually Learned.",
    preview: "I am a retired teacher with time on my hands and a belief that local government matters more than people think. I committed to attending every public council session for twelve months. What I found surprised me.",
    signature: "T. Nakamura", region: "Toronto, Canada", timeAgo: "3 hours ago", readTime: "7 min read", upvotes: 892,
    gradient: "linear-gradient(135deg, #6B3A1A 0%, #2D1508 100%)",
    body: [
      "I retired from teaching high school civics for thirty-one years. You would think that would make me cynical about democratic institutions. It made me the opposite. I believe, genuinely, that local government is where democracy either works or fails, and that most people never see it because they never show up.",
      "So I showed up. Every session. For a year.",
      "What I expected: bureaucracy, tedium, occasional moments of local significance.",
      "What I found: something more complicated and more human than I anticipated.",
      "The councillors, almost without exception, are trying. That surprised me most. They are not, as I had half-expected, cynical operators running out the clock. Most of them are people who genuinely want to solve problems and are genuinely frustrated by how hard it is. The machinery of municipal government is slow in ways that have nothing to do with the people operating it.",
      "What I did not expect was how much of the real work happens before the public meetings. By the time a vote is called, the outcome is almost always already determined. The public delegations, the debate, the recorded votes — these are real, but they are the final chapter of a process that began in conversations and working groups that the public never sees.",
      "I am not saying this to discourage participation. I am saying it to redirect it. If you want to change something in your city, show up before the vote, not at it. Learn which meeting matters and be in the room for that one. The earlier you are in the process the more your voice weighs.",
      "This is what thirty-one years of civics class could not teach me. One year of attendance did.",
    ],
    spawnedQuestion: 5,
  },
  {
    id: 105, ring: "global", category: "economy",
    headline: "I Work in an Amazon Warehouse. Here Is What $15 an Hour Actually Buys You.",
    preview: "I have packed over a million items. I know the name of every product in my section. I do not know the name of a single person who runs the company whose logo is on my vest.",
    signature: "D. Reyes", region: "Stockton, California", timeAgo: "4 hours ago", readTime: "7 min read", upvotes: 22103,
    gradient: "linear-gradient(135deg, #1A3A6B 0%, #0A1A35 100%)",
    body: [
      "I have worked in the same Amazon fulfilment centre for four years. In that time I have packed over a million items. I know the weight of every box size they use. I know which shelving units have the loose wheels. I know the name of every product in my section. I do not know the name of a single person who runs the company whose logo is on my vest.",
      "Let me tell you what $15 an hour actually buys you in 2026.",
      "It buys you a room, not an apartment. It buys you a car that may or may not start on cold mornings, which matters because the buses do not run at 4am when my shift begins. It buys you food if you are careful, and nothing else if you are not. It does not buy you a dentist. It does not buy your children new shoes when they need them instead of when you can afford them. It does not buy you sick days — not real ones, not without the point system counting against you.",
      "Last quarter Amazon reported profits of over $17 billion. I looked it up on my phone during a bathroom break, which I am allowed to take twice per shift. I have thought about that number every day since.",
      "I am not asking for sympathy. I chose this job and I show up for it. What I am asking is a question I cannot stop asking myself: at what point does the distance between the people who build a company and the people who profit from it become something that a society is no longer willing to call acceptable?",
      "I do not know what $17 billion feels like. I know what $15 an hour feels like. I know it in my lower back at the end of a ten hour shift. I know it in the look on my daughter's face when I tell her we are waiting until next month.",
      "I am writing this because I believe that if the people at the top of these companies had to read what the people at the bottom actually experience, something might change. Maybe it would not. But I would rather say it than not.",
    ],
    spawnedQuestion: 8,
  },
  {
    id: 106, ring: "global", category: "conflict",
    headline: "I Fought in Two Wars. Nobody Ever Asked Me If I Thought We Should.",
    preview: "I served fourteen years. I deployed twice. I was given many things by my country — training, equipment, orders. I was never given a choice about whether the mission itself was worth the cost.",
    signature: "T. Brennan", region: "Glasgow, Scotland", timeAgo: "7 hours ago", readTime: "9 min read", upvotes: 31882,
    gradient: "linear-gradient(135deg, #8B1A1A 0%, #3D0A0A 100%)",
    body: [
      "I served for fourteen years. I deployed twice — once to a place I am not permitted to name under the terms of my discharge, and once to a place that was on the news every night for two years before anyone thought to ask the people doing the fighting what they thought about being there.",
      "I was given many things by my country. Training. Equipment. Orders. A sense of purpose that I am still untangling from a sense of obligation. I was never given a choice about whether the mission itself was worth the cost.",
      "I want to be careful here because I am not talking about discipline. I understand why armies cannot function as democracies in the field. I am not suggesting that soldiers vote on whether to follow an order in a firefight. That is not what I mean.",
      "What I mean is this: somewhere between the moment a government decides to go to war and the moment a person like me steps off a plane into a place I have never been, there is a conversation that never happens. The people with the most information about what war actually costs — the ones who will pay that cost in their bodies and their sleep and their marriages — are never consulted.",
      "I have spoken to veterans from six different countries. The story is the same in all of them. They were told what they were fighting for. They were not asked if they believed it. They were not asked if it was worth it. They were certainly not asked after, when the answers would have been most honest.",
      "I believe in service. I believe some things are worth fighting for. What I no longer believe is that the people who make those decisions should be insulated from the perspective of the people who carry them out.",
      "I am not angry. I made my choices. But I am asking, now that I have the voice I was not given then: should that be allowed to change?",
    ],
    spawnedQuestion: 9,
  },
  {
    id: 107, ring: "global", category: "humanRights",
    headline: "Every Person I Have Ever Met Wanted the Same Three Things. None of Them Required a War.",
    preview: "I have worked as a translator in eleven countries across four decades. I have translated for refugees, diplomats, soldiers and heads of state. What people actually say, when they think nobody important is listening, is remarkably consistent.",
    signature: "F. Al-Rashid", region: "Beirut, Lebanon", timeAgo: "12 hours ago", readTime: "6 min read", upvotes: 18441,
    gradient: "linear-gradient(135deg, #6B1A6A 0%, #2D0A2D 100%)",
    body: [
      "I have worked as a translator in eleven countries across four decades. Arabic, French, English, and enough Farsi to get by. I have translated for refugees sitting on concrete floors. I have translated for diplomats in rooms with better chairs than I will ever own. I have translated for soldiers, for aid workers, for a head of state who asked me not to translate exactly what he said.",
      "I want to tell you what people actually say when they think nobody important is listening.",
      "They want to be safe. They want their children to eat. They want to be treated as if they matter.",
      "That is it. In eleven countries. Over forty years. Across every religion, every language, every political system I have encountered. The wants underneath the noise are always the same three things.",
      "None of them require a war. None of them require a border. None of them are in conflict with what the person on the other side of that border also wants.",
      "What requires a war is usually something else entirely — something that benefits people who are not in the room where I am translating, people who will not be in the room when the consequences arrive.",
      "I have spent my life in the space between languages, which means I have spent my life in the space between what people mean and what they say. I can tell you that the gap between what ordinary people want and what their governments do in their name is the largest translation problem that has ever existed.",
      "I do not know how to solve it. But I know that platforms where people from those eleven countries can speak directly to each other, without a government or a journalist or an algorithm deciding what gets through, are the closest thing to a solution I have seen.",
    ],
    spawnedQuestion: 12,
  },
];

const questionResponses = {
  1: {
    directlyAffected: [
      { id: 1, region: "Kyiv, Ukraine",       upvotes: 8241, hasVideo: true,  timeAgo: "11 hours ago", text: "I am from Kyiv. We were told this would be over in days. Three years later my brother has not come home. The stated reason was protection. I do not recognize that word anymore." },
      { id: 2, region: "Ohio, United States", upvotes: 6102, hasVideo: false, timeAgo: "13 hours ago", text: "My son was deployed based on information that was later proven false by the same government that sent him. We will never get those years back. Or him." },
      { id: 3, region: "Bamako, Mali",        upvotes: 4887, hasVideo: true,  timeAgo: "14 hours ago", text: "I live in a village that does not appear on any news map. We have no idea why there are soldiers here. When I ask them they say they do not know either. This is the truth of war." },
    ],
    observers: [
      { id: 4, region: "London, United Kingdom", upvotes: 12441, hasVideo: false, timeAgo: "10 hours ago", text: "As someone who has studied international relations for 20 years, I can say the gap between stated and actual reasons for military intervention has never been wider or more documented. The evidence is in every declassified archive." },
      { id: 5, region: "Toronto, Canada",        upvotes: 9102, hasVideo: false, timeAgo: "12 hours ago", text: "I follow three different national news sources covering the same conflict and they describe three completely different wars. At least one of them is lying. Possibly all three." },
    ],
  },
};

const fmt = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
const cat = (key) => categories[key] || categories.governance;

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

function PollBar({ poll }) {
  const bars = [
    { label: "Yes", value: poll.yes, color: "#1A6B35" },
    { label: "No",  value: poll.no,  color: "#8B1A1A" },
    { label: "Unsure", value: poll.unsure, color: "#999" },
  ];
  return (
    <div>
      <div style={{ display: "flex", height: 5, borderRadius: 3, overflow: "hidden", gap: 2, marginBottom: 7 }}>
        {bars.map(({ label, value, color }) => <div key={label} style={{ flex: value, background: color }} />)}
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        {bars.map(({ label, value, color }) => (
          <span key={label} style={{ fontSize: 11, color, fontFamily: "Inter, sans-serif", fontWeight: 600 }}>{value}% {label}</span>
        ))}
      </div>
    </div>
  );
}

function UnionHeader({ onBack, showBack, rightSlot }) {
  return (
    <header style={{ background: "#0F1F3D", padding: "0 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ minWidth: 60 }}>
          {showBack && (
            <button onClick={onBack} style={{ color: "#8FA8C8", background: "none", border: "none", cursor: "pointer", fontSize: 13, fontFamily: "Inter, sans-serif" }}>
              ← Back
            </button>
          )}
          {!showBack && <span style={{ fontSize: 11, color: "#8FA8C8" }}>📍 Toronto, ON</span>}
        </div>
        <span style={{ fontFamily: "Playfair Display, serif", color: "#FFFFFF", fontSize: 42, fontWeight: 700, letterSpacing: "-1px", lineHeight: 1 }}>Union</span>
        <div style={{ minWidth: 60, display: "flex", justifyContent: "flex-end" }}>{rightSlot}</div>
      </div>
    </header>
  );
}

function CategoryBadge({ categoryKey, style = {} }) {
  const c = cat(categoryKey);
  return (
    <span style={{ background: c.bg, color: c.color, padding: "3px 9px", borderRadius: 2, fontSize: 10, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", ...style }}>
      {c.label}
    </span>
  );
}

// ─── FEED VIEW ────────────────────────────────────────────────────────────────

function FeedView({ onSelectQuestion, onSelectVoice, onCreate, onAbout }) {
  const [activeRing, setActiveRing]       = useState("global");
  const [activeContent, setActiveContent] = useState("questions");
  const [activeTab, setActiveTab]         = useState("trending");

  const ringQuestions = questions.filter(q => q.ring === activeRing);
  const ringVoices    = voices.filter(v => v.ring === activeRing);
  const ringArchived  = archivedQuestions.filter(q => q.ring === activeRing);

  const VoiceCard = ({ v }) => {
    const c = cat(v.category);
    return (
      <div
        onClick={() => onSelectVoice(v.id)}
        style={{ background: "#FFFFFF", border: "1px solid #E0DDD5", borderLeft: `4px solid ${c.color}`, borderRadius: "0 6px 6px 0", marginBottom: 14, cursor: "pointer", overflow: "hidden", transition: "box-shadow 0.15s, transform 0.1s" }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.09)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, padding: "24px" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center" }}>
              <span style={{ background: "#F0EDE6", color: "#888", padding: "3px 9px", borderRadius: 2, fontSize: 10, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase" }}>
                Voice
              </span>
              <CategoryBadge categoryKey={v.category} />
            </div>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 19, fontWeight: 700, lineHeight: 1.35, color: "#0D0D0D", marginBottom: 10 }}>
              {v.headline}
            </h2>
            <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, marginBottom: 16 }}>
              {v.preview}
            </p>
            <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#0D0D0D", fontStyle: "italic", fontFamily: "Playfair Display, serif" }}>{v.signature}</span>
              <span style={{ fontSize: 11, color: "#C0BDB8" }}>·</span>
              <span style={{ fontSize: 11, color: "#999" }}>{v.region}</span>
              <span style={{ fontSize: 11, color: "#C0BDB8" }}>·</span>
              <span style={{ fontSize: 11, color: "#999" }}>{v.readTime}</span>
              <span style={{ fontSize: 11, color: "#C0BDB8", marginLeft: "auto" }}>▲ {fmt(v.upvotes)}</span>
            </div>
          </div>
          <div style={{ width: 100, minHeight: 100, background: v.gradient, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 28, opacity: 0.4 }}>
              {v.category === "conflict" ? "⚔" : v.category === "environment" ? "🌿" : v.category === "economy" ? "⚖" : v.category === "governance" ? "🏛" : "✊"}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const QuestionCard = ({ q }) => {
    const c = cat(q.category);
    return (
      <div
        onClick={() => onSelectQuestion(q.id)}
        style={{ background: "#FFFFFF", border: "1px solid #E0DDD5", borderLeft: `4px solid ${c.color}`, borderRadius: "0 6px 6px 0", padding: "24px", marginBottom: 14, cursor: "pointer", transition: "box-shadow 0.15s, transform 0.1s" }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.09)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
      >
        <div style={{ marginBottom: 12 }}><CategoryBadge categoryKey={q.category} /></div>
        <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 20, fontWeight: 700, lineHeight: 1.35, color: "#0D0D0D", marginBottom: 18 }}>{q.question}</h2>
        <PollBar poll={q.poll} />
        <div style={{ display: "flex", gap: 20, marginTop: 14, paddingTop: 12, borderTop: "1px solid #F3F0EB" }}>
          <span style={{ fontSize: 12, color: "#999" }}>{fmt(q.responses)} responses</span>
          <span style={{ fontSize: 12, color: "#8B1A1A", fontWeight: 600 }}>{fmt(q.directlyAffected)} directly affected</span>
          <span style={{ fontSize: 12, color: "#C0BDB8", marginLeft: "auto" }}>{q.timeAgo}</span>
        </div>
      </div>
    );
  };

  const emptyItems = activeContent === "questions" ? ringQuestions.length === 0 : activeContent === "voices" ? ringVoices.length === 0 : ringArchived.length === 0;

  const ArchivedCard = ({ q }) => {
    const c = cat(q.category);
    return (
      <div style={{ background: "#FFFFFF", border: "1px solid #E0DDD5", borderLeft: `4px solid ${c.color}40`, borderRadius: "0 6px 6px 0", padding: "20px 24px", marginBottom: 14, opacity: 0.85 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center", flexWrap: "wrap" }}>
          <CategoryBadge categoryKey={q.category} />
          <span style={{ background: "#F0EDE6", color: "#AAA", padding: "3px 9px", borderRadius: 2, fontSize: 10, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase" }}>
            Closed · {q.closedDate}
          </span>
        </div>
        <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 19, fontWeight: 700, lineHeight: 1.35, color: "#555", marginBottom: 16 }}>{q.question}</h2>
        <PollBar poll={q.poll} />
        <div style={{ display: "flex", gap: 20, marginTop: 12, paddingTop: 12, borderTop: "1px solid #F3F0EB" }}>
          <span style={{ fontSize: 12, color: "#AAA" }}>{fmt(q.responses)} responses · Final</span>
          <span style={{ fontSize: 12, color: "#C0392B40", fontWeight: 600 }}>{fmt(q.directlyAffected)} directly affected</span>
          <span style={{ fontSize: 11, color: "#C0BDB8", marginLeft: "auto", fontStyle: "italic" }}>Read only</span>
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F8F6F1", fontFamily: "Inter, sans-serif" }}>
      <style>{FONTS}</style>
      <header style={{ background: "#0F1F3D", padding: "0 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, color: "#8FA8C8" }}>📍 Toronto, ON</span>
          <span style={{ fontFamily: "Playfair Display, serif", color: "#FFFFFF", fontSize: 42, fontWeight: 700, letterSpacing: "-1px", lineHeight: 1 }}>Union</span>
          <button onClick={onCreate} style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 4, padding: "6px 14px", color: "#FFFFFF", fontSize: 12, cursor: "pointer", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
            + Create
          </button>
        </div>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {[{ key: "local", label: "Local", sub: "Toronto" }, { key: "regional", label: "Regional", sub: "Ontario" }, { key: "global", label: "Global", sub: "Worldwide" }].map(({ key, label, sub }) => (
            <button key={key} onClick={() => setActiveRing(key)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", padding: "10px 0", borderBottom: activeRing === key ? "2px solid #FFFFFF" : "2px solid transparent", color: activeRing === key ? "#FFFFFF" : "#8FA8C8", fontFamily: "Inter, sans-serif" }}>
              <div style={{ fontSize: 11, fontWeight: 600 }}>{label}</div>
              <div style={{ fontSize: 9, marginTop: 1, opacity: 0.65 }}>{sub}</div>
            </button>
          ))}
        </div>
      </header>

      <div style={{ background: "#FFFFFF", borderBottom: "1px solid #E0DDD5" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", alignItems: "center" }}>
          {[{ key: "questions", label: "Questions" }, { key: "voices", label: "Voices" }, { key: "archive", label: "Archive" }].map(({ key, label }) => (
            <button key={key} onClick={() => setActiveContent(key)} style={{ padding: "12px 20px", background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, color: activeContent === key ? "#0F1F3D" : "#BBB", borderBottom: activeContent === key ? "2px solid #0F1F3D" : "2px solid transparent", fontFamily: "Inter, sans-serif" }}>
              {label}
            </button>
          ))}
          <div style={{ width: 1, height: 20, background: "#E0DDD5", margin: "0 4px" }} />
          {["trending", "new"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "12px 14px", background: "none", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: activeTab === tab ? "#0F1F3D" : "#CCC", borderBottom: activeTab === tab ? "2px solid #0F1F3D" : "2px solid transparent", fontFamily: "Inter, sans-serif" }}>
              {tab === "trending" ? "🔥" : "⬆"} {tab}
            </button>
          ))}
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", paddingRight: 16 }}>
            <span style={{ fontSize: 11, color: "#C0BDB8" }}>
              {activeContent === "questions" ? ringQuestions.length : activeContent === "voices" ? ringVoices.length : ringArchived.length} {activeContent === "archive" ? "closed" : "active"}
            </span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px" }}>
        {emptyItems ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontFamily: "Playfair Display, serif", fontSize: 22, color: "#BBB", fontStyle: "italic", marginBottom: 8 }}>Nothing here yet.</p>
            <p style={{ fontSize: 13, color: "#CCC" }}>Be the first to contribute to this ring.</p>
          </div>
        ) : activeContent === "questions" ? (
          ringQuestions.map(q => <QuestionCard key={q.id} q={q} />)
        ) : activeContent === "voices" ? (
          ringVoices.map(v => <VoiceCard key={v.id} v={v} />)
        ) : (
          <>
            <div style={{ background: "#F0EDE6", border: "1px solid #E0DDD5", borderRadius: 6, padding: "14px 20px", marginBottom: 20 }}>
              <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>
                <strong style={{ color: "#0D0D0D" }}>The Archive</strong> — Questions that have closed after 30 days. Results are final. Responses are permanent. The record stands.
              </p>
            </div>
            {ringArchived.map(q => <ArchivedCard key={q.id} q={q} />)}
          </>
        )}
        {!emptyItems && activeContent !== "archive" && (
          <div style={{ textAlign: "center", padding: "36px 0 16px", borderTop: "1px solid #E0DDD5", marginTop: 8 }}>
            <p style={{ fontFamily: "Playfair Display, serif", fontSize: 15, color: "#BBB", fontStyle: "italic" }}>You've reached the end of today's {activeContent}.</p>
            <p style={{ fontSize: 12, color: "#CCC", marginTop: 4 }}>Check back as new {activeContent} are submitted.</p>
          </div>
        )}

        {/* About Union footer link */}
        <div style={{ textAlign: "center", padding: "28px 0 8px", borderTop: "1px solid #E0DDD5", marginTop: emptyItems ? 0 : 0 }}>
          <button onClick={onAbout} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Playfair Display, serif", fontSize: 13, color: "#C0BDB8", fontStyle: "italic" }}
            onMouseEnter={e => e.currentTarget.style.color = "#0F1F3D"}
            onMouseLeave={e => e.currentTarget.style.color = "#C0BDB8"}>
            What Union stands for →
          </button>
          <p style={{ fontSize: 10, color: "#D8D5CE", marginTop: 8 }}>Est. 2026 · Non-profit · Open source</p>
        </div>
      </div>
    </div>
  );
}

// ─── QUESTION DETAIL VIEW ─────────────────────────────────────────────────────

function QuestionDetailView({ questionId, onBack, onRespond }) {
  const [upvoted, setUpvoted] = useState({});
  const [pollVote, setPollVote] = useState(null);
  const q = questions.find(x => x.id === questionId);
  const r = questionResponses[questionId] || { directlyAffected: [], observers: [] };
  const c = cat(q.category);

  const ResponseCard = ({ resp, affected }) => (
    <div style={{ background: "#FFFFFF", border: "1px solid #E0DDD5", borderLeft: `3px solid ${affected ? "#8B1A1A" : "#999"}`, borderRadius: "0 6px 6px 0", padding: "20px", marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#0D0D0D" }}>{resp.region}</span>
          {affected && <span style={{ background: "#FDF0F0", color: "#8B1A1A", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 2, letterSpacing: "0.5px", textTransform: "uppercase" }}>Directly Affected</span>}
          {resp.hasVideo && <span style={{ background: "#F0F4FD", color: "#1A3A6B", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 2 }}>▶ VIDEO</span>}
        </div>
        <span style={{ fontSize: 11, color: "#C0BDB8", whiteSpace: "nowrap", marginLeft: 8 }}>{resp.timeAgo}</span>
      </div>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: "#2D2D2D", marginBottom: 14, fontStyle: affected ? "italic" : "normal" }}>
        {affected ? `"${resp.text}"` : resp.text}
      </p>
      <button onClick={() => setUpvoted(u => ({ ...u, [resp.id]: !u[resp.id] }))} style={{ background: "none", border: `1px solid ${upvoted[resp.id] ? "#0F1F3D" : "#E0DDD5"}`, borderRadius: 3, padding: "5px 12px", fontSize: 12, cursor: "pointer", color: upvoted[resp.id] ? "#0F1F3D" : "#999", fontFamily: "Inter, sans-serif", fontWeight: upvoted[resp.id] ? 700 : 400, transition: "all 0.1s" }}>
        ▲ {fmt(resp.upvotes + (upvoted[resp.id] ? 1 : 0))}
      </button>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#F8F6F1", fontFamily: "Inter, sans-serif" }}>
      <style>{FONTS}</style>
      <UnionHeader showBack onBack={onBack} />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          <CategoryBadge categoryKey={q.category} />
          <span style={{ background: "#F0EDE6", color: "#888", padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {q.ring === "global" ? "🌐 Global" : q.ring === "regional" ? "📍 Ontario" : "📍 Toronto"}
          </span>
        </div>
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 30, fontWeight: 900, lineHeight: 1.25, color: "#0D0D0D", marginBottom: 20, borderLeft: `4px solid ${c.color}`, paddingLeft: 18 }}>
          {q.question}
        </h1>
        <div style={{ display: "flex", gap: 24, marginBottom: 28, paddingBottom: 24, borderBottom: "1px solid #E0DDD5", flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, color: "#888" }}>{fmt(q.responses)} total responses</span>
          <span style={{ fontSize: 13, color: "#8B1A1A", fontWeight: 600 }}>{fmt(q.directlyAffected)} directly affected</span>
          <span style={{ fontSize: 13, color: "#C0BDB8" }}>{q.timeAgo}</span>
        </div>
        <div style={{ background: "#FFFFFF", border: "1px solid #E0DDD5", borderRadius: 6, padding: "20px 24px", marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", color: "#AAA", marginBottom: 4 }}>
            Community Poll — Verified Members Only
          </div>
          {!pollVote ? (
            <>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 16, marginTop: 4 }}>Cast your vote. Results reveal after you respond.</p>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { key: "yes",    label: "Yes",    color: "#1A6B35", bg: "#F0FDF4", border: "#1A6B35" },
                  { key: "no",     label: "No",     color: "#8B1A1A", bg: "#FDF0F0", border: "#8B1A1A" },
                  { key: "unsure", label: "Unsure", color: "#666",    bg: "#F5F5F5", border: "#999"    },
                ].map(({ key, label, color, bg, border }) => (
                  <button
                    key={key}
                    onClick={() => setPollVote(key)}
                    style={{ flex: 1, padding: "14px 8px", border: `2px solid #E0DDD5`, borderRadius: 4, background: "#FAFAF8", color: "#888", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.15s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.background = bg; e.currentTarget.style.color = color; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#E0DDD5"; e.currentTarget.style.background = "#FAFAF8"; e.currentTarget.style.color = "#888"; }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, marginTop: 4 }}>
                <span style={{ fontSize: 12, color: "#888" }}>
                  You voted <strong style={{ color: pollVote === "yes" ? "#1A6B35" : pollVote === "no" ? "#8B1A1A" : "#666" }}>
                    {pollVote.charAt(0).toUpperCase() + pollVote.slice(1)}
                  </strong>
                </span>
                <button onClick={() => setPollVote(null)} style={{ fontSize: 11, color: "#C0BDB8", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", textDecoration: "underline" }}>
                  Change
                </button>
              </div>
              <PollBar poll={q.poll} />
              <div style={{ fontSize: 11, color: "#C0BDB8", marginTop: 10 }}>
                {fmt(Math.round(q.responses * 0.62))} verified votes · Results update every hour
              </div>
            </>
          )}
        </div>
        <button onClick={onRespond} style={{ width: "100%", background: "#0F1F3D", color: "#FFFFFF", border: "none", borderRadius: 4, padding: "15px", fontSize: 14, fontWeight: 700, cursor: "pointer", marginBottom: 36, fontFamily: "Inter, sans-serif", letterSpacing: "0.4px" }}
          onMouseEnter={e => e.currentTarget.style.background = "#1A3A6B"}
          onMouseLeave={e => e.currentTarget.style.background = "#0F1F3D"}>
          Add Your Voice
        </button>
        {r.directlyAffected.length > 0 && (
          <div style={{ marginBottom: 36 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ background: "#8B1A1A", color: "white", fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 2, letterSpacing: "0.6px", textTransform: "uppercase" }}>Directly Affected</span>
              <span style={{ fontSize: 12, color: "#999" }}>{fmt(q.directlyAffected)} voices from the ground — shown first</span>
            </div>
            {r.directlyAffected.map(resp => <ResponseCard key={resp.id} resp={resp} affected={true} />)}
          </div>
        )}
        {r.observers.length > 0 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ background: "#555", color: "white", fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 2, letterSpacing: "0.6px", textTransform: "uppercase" }}>Observers</span>
              <span style={{ fontSize: 12, color: "#999" }}>Responding from outside the situation</span>
            </div>
            {r.observers.map(resp => <ResponseCard key={resp.id} resp={resp} affected={false} />)}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── VOICE DETAIL VIEW ────────────────────────────────────────────────────────

function VoiceDetailView({ voiceId, onBack, onSelectQuestion }) {
  const [upvoted, setUpvoted] = useState(false);
  const v = voices.find(x => x.id === voiceId);
  const c = cat(v.category);
  const spawned = questions.find(q => q.id === v.spawnedQuestion);

  return (
    <div style={{ minHeight: "100vh", background: "#F8F6F1", fontFamily: "Inter, sans-serif" }}>
      <style>{FONTS}</style>
      <UnionHeader showBack onBack={onBack} />

      {/* Hero image */}
      <div style={{ width: "100%", height: 220, background: v.gradient, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <span style={{ fontSize: 72, opacity: 0.18 }}>
          {v.category === "conflict" ? "⚔" : v.category === "environment" ? "🌿" : v.category === "economy" ? "⚖" : v.category === "governance" ? "🏛" : "✊"}
        </span>
        <div style={{ position: "absolute", bottom: 16, left: 24, display: "flex", gap: 8 }}>
          <span style={{ background: "rgba(255,255,255,0.15)", color: "white", padding: "4px 10px", borderRadius: 2, fontSize: 10, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", backdropFilter: "blur(4px)" }}>Voice</span>
          <span style={{ background: "rgba(255,255,255,0.15)", color: "white", padding: "4px 10px", borderRadius: 2, fontSize: 10, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", backdropFilter: "blur(4px)" }}>{c.label}</span>
        </div>
        <div style={{ position: "absolute", bottom: 16, right: 24 }}>
          <span style={{ background: "rgba(255,255,255,0.15)", color: "white", padding: "4px 10px", borderRadius: 2, fontSize: 10, fontWeight: 600, backdropFilter: "blur(4px)" }}>{v.readTime}</span>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "36px 24px" }}>
        {/* Headline */}
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 34, fontWeight: 900, lineHeight: 1.2, color: "#0D0D0D", marginBottom: 20, borderLeft: `4px solid ${c.color}`, paddingLeft: 18 }}>
          {v.headline}
        </h1>

        {/* Byline */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32, paddingBottom: 24, borderBottom: "1px solid #E0DDD5", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "Playfair Display, serif", fontSize: 16, fontWeight: 700, fontStyle: "italic", color: "#0D0D0D" }}>{v.signature}</span>
          <span style={{ fontSize: 11, color: "#C0BDB8" }}>·</span>
          <span style={{ fontSize: 13, color: "#888" }}>{v.region}</span>
          <span style={{ fontSize: 11, color: "#C0BDB8" }}>·</span>
          <span style={{ fontSize: 13, color: "#888" }}>{v.timeAgo}</span>
          <button
            onClick={() => setUpvoted(u => !u)}
            style={{ marginLeft: "auto", background: "none", border: `1px solid ${upvoted ? "#0F1F3D" : "#E0DDD5"}`, borderRadius: 3, padding: "6px 14px", fontSize: 13, cursor: "pointer", color: upvoted ? "#0F1F3D" : "#999", fontFamily: "Inter, sans-serif", fontWeight: upvoted ? 700 : 400, transition: "all 0.1s" }}
          >
            ▲ {fmt(v.upvotes + (upvoted ? 1 : 0))}
          </button>
        </div>

        {/* Body */}
        <div style={{ marginBottom: 40 }}>
          {v.body.map((para, i) => (
            <p key={i} style={{ fontFamily: i === 0 ? "Inter, sans-serif" : "Inter, sans-serif", fontSize: i === 1 ? 20 : 16, fontWeight: i === 1 ? 600 : 400, lineHeight: 1.8, color: i === 1 ? "#0D0D0D" : "#2D2D2D", marginBottom: i === 1 ? 24 : 20, fontStyle: i === 1 ? "italic" : "normal" }}>
              {para}
            </p>
          ))}
        </div>

        {/* Signature block */}
        <div style={{ borderTop: "2px solid #0D0D0D", borderBottom: "1px solid #E0DDD5", padding: "20px 0", marginBottom: 40 }}>
          <p style={{ fontFamily: "Playfair Display, serif", fontSize: 18, fontWeight: 700, fontStyle: "italic", color: "#0D0D0D", marginBottom: 4 }}>{v.signature}</p>
          <p style={{ fontSize: 12, color: "#888" }}>{v.region} · Verified Union Member</p>
        </div>

        {/* Spawned question */}
        {spawned && (
          <div style={{ background: "#FFFFFF", border: "1px solid #E0DDD5", borderLeft: `4px solid ${c.color}`, borderRadius: "0 6px 6px 0", padding: "20px 24px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#AAA", marginBottom: 12 }}>
              Question sparked by this Voice
            </div>
            <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 17, fontWeight: 700, lineHeight: 1.4, color: "#0D0D0D", marginBottom: 14 }}>
              {spawned.question}
            </h3>
            <PollBar poll={spawned.poll} />
            <div style={{ display: "flex", gap: 16, marginTop: 12, paddingTop: 12, borderTop: "1px solid #F3F0EB" }}>
              <span style={{ fontSize: 12, color: "#999" }}>{fmt(spawned.responses)} responses</span>
              <span style={{ fontSize: 12, color: "#8B1A1A", fontWeight: 600 }}>{fmt(spawned.directlyAffected)} directly affected</span>
              <button
                onClick={() => onSelectQuestion(spawned.id)}
                style={{ marginLeft: "auto", background: "#0F1F3D", color: "white", border: "none", borderRadius: 3, padding: "6px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "Inter, sans-serif", letterSpacing: "0.3px" }}
              >
                Read responses →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── RESPOND VIEW ─────────────────────────────────────────────────────────────

function RespondView({ questionId, onBack }) {
  const [affected, setAffected] = useState(null);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const q = questions.find(x => x.id === questionId);
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const canSubmit = affected !== null && wordCount >= 50 && text.length <= 500;

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "#F8F6F1", display: "flex", flexDirection: "column", fontFamily: "Inter, sans-serif" }}>
        <style>{FONTS}</style>
        <UnionHeader />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ textAlign: "center", maxWidth: 440 }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>✓</div>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 26, fontWeight: 700, color: "#0D0D0D", marginBottom: 12 }}>Your voice is in.</h2>
            <p style={{ fontSize: 14, color: "#888", lineHeight: 1.7, marginBottom: 28 }}>Your response has been submitted. As independent voices align, it will rise in the feed.</p>
            <button onClick={onBack} style={{ background: "#0F1F3D", color: "#FFFFFF", border: "none", borderRadius: 4, padding: "12px 32px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>Back to the question</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F8F6F1", fontFamily: "Inter, sans-serif" }}>
      <style>{FONTS}</style>
      <UnionHeader showBack onBack={onBack} />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 24px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#AAA", marginBottom: 8 }}>Responding to</p>
        <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 20, fontWeight: 700, color: "#0D0D0D", marginBottom: 28, lineHeight: 1.35 }}>{q?.question}</h2>
        <div style={{ background: "#FFFFFF", border: "1px solid #E0DDD5", borderRadius: 6, padding: "20px 24px", marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#AAA", marginBottom: 14 }}>Are you directly affected by this issue?</p>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setAffected(true)}  style={{ flex: 1, padding: "13px", border: `2px solid ${affected === true  ? "#8B1A1A" : "#E0DDD5"}`, borderRadius: 4, background: affected === true  ? "#FDF0F0" : "#FAFAF8", color: affected === true  ? "#8B1A1A" : "#888", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.15s" }}>Yes — I am directly affected</button>
            <button onClick={() => setAffected(false)} style={{ flex: 1, padding: "13px", border: `2px solid ${affected === false ? "#555"    : "#E0DDD5"}`, borderRadius: 4, background: affected === false ? "#F5F5F5" : "#FAFAF8", color: affected === false ? "#333"    : "#888", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.15s" }}>No — I am an observer</button>
          </div>
        </div>
        <div style={{ background: "#FFFFFF", border: "1px solid #E0DDD5", borderRadius: 6, padding: "20px 24px", marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#AAA", marginBottom: 14 }}>Your response</p>
          <textarea value={text} onChange={e => e.target.value.length <= 500 && setText(e.target.value)} placeholder="Say what you actually think. This is your voice on the record." style={{ width: "100%", height: 160, border: "1px solid #E0DDD5", borderRadius: 4, padding: "14px", fontSize: 14, lineHeight: 1.65, fontFamily: "Inter, sans-serif", color: "#0D0D0D", resize: "none", background: "#FAFAF8" }} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span style={{ fontSize: 11, color: wordCount < 50 ? "#C0392B" : "#1A6B35" }}>{wordCount} / 50 words minimum</span>
            <span style={{ fontSize: 11, color: text.length > 480 ? "#C0392B" : "#AAA" }}>{text.length} / 500</span>
          </div>
        </div>
        <div style={{ background: "#FFFFFF", border: "1px solid #E0DDD5", borderRadius: 6, padding: "20px 24px", marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#AAA", marginBottom: 6 }}>Add your face — optional</p>
          <p style={{ fontSize: 13, color: "#999", marginBottom: 16, lineHeight: 1.6 }}>Front-facing camera only. 90 seconds maximum. No editing, no filters.</p>
          <button style={{ width: "100%", padding: "13px", border: "1px dashed #C8C4BC", borderRadius: 4, background: "#FAFAF8", color: "#AAA", fontSize: 13, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>● Record video</button>
        </div>
        <button onClick={() => canSubmit && setSubmitted(true)} style={{ width: "100%", background: canSubmit ? "#0F1F3D" : "#C0BDB8", color: "#FFFFFF", border: "none", borderRadius: 4, padding: "15px", fontSize: 14, fontWeight: 700, cursor: canSubmit ? "pointer" : "not-allowed", fontFamily: "Inter, sans-serif", letterSpacing: "0.4px" }}>
          {canSubmit ? "Submit Response" : `${affected === null ? "Declare your position first" : `${50 - wordCount} more words needed`}`}
        </button>
        <p style={{ fontSize: 11, color: "#C0BDB8", textAlign: "center", marginTop: 10 }}>Once submitted your response cannot be edited or deleted</p>
      </div>
    </div>
  );
}

// ─── CREATE VIEW (choose type) ────────────────────────────────────────────────

function CreateView({ onAsk, onWriteVoice, onBack }) {
  return (
    <div style={{ minHeight: "100vh", background: "#F8F6F1", fontFamily: "Inter, sans-serif" }}>
      <style>{FONTS}</style>
      <UnionHeader showBack onBack={onBack} />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px" }}>
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 32, fontWeight: 700, color: "#0D0D0D", marginBottom: 8 }}>What do you want to contribute?</h1>
        <p style={{ fontSize: 14, color: "#888", marginBottom: 40, lineHeight: 1.6 }}>Both require verification. Neither carries your real name.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div onClick={onAsk} style={{ background: "#FFFFFF", border: "1px solid #E0DDD5", borderLeft: "4px solid #0F1F3D", borderRadius: "0 8px 8px 0", padding: "28px 32px", cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.09)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>?</div>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 22, fontWeight: 700, color: "#0D0D0D", marginBottom: 8 }}>Ask a Question</h2>
            <p style={{ fontSize: 14, color: "#888", lineHeight: 1.6 }}>Put a question to the world. It starts in your ring and climbs through upvotes and responses. The crowd decides if it matters.</p>
            <div style={{ marginTop: 16, fontSize: 13, fontWeight: 600, color: "#0F1F3D" }}>Ask now →</div>
          </div>
          <div onClick={onWriteVoice} style={{ background: "#FFFFFF", border: "1px solid #E0DDD5", borderLeft: "4px solid #8B1A1A", borderRadius: "0 8px 8px 0", padding: "28px 32px", cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.09)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>✍</div>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 22, fontWeight: 700, color: "#0D0D0D", marginBottom: 8 }}>Write a Voice</h2>
            <p style={{ fontSize: 14, color: "#888", lineHeight: 1.6 }}>Long form. First person. With a headline, an image and your signature. For when the truth needs more than a paragraph. Verified members only.</p>
            <div style={{ marginTop: 16, fontSize: 13, fontWeight: 600, color: "#8B1A1A" }}>Write now →</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── WRITE VOICE VIEW ─────────────────────────────────────────────────────────

function WriteVoiceView({ onBack }) {
  const [category, setCategory] = useState(null);
  const [ring, setRing]         = useState(null);
  const [headline, setHeadline] = useState("");
  const [body, setBody]         = useState("");
  const [submitted, setSubmitted] = useState(false);
  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;
  const canSubmit = category && ring && headline.trim().length > 10 && wordCount >= 150;

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "#F8F6F1", display: "flex", flexDirection: "column", fontFamily: "Inter, sans-serif" }}>
        <style>{FONTS}</style>
        <UnionHeader />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ textAlign: "center", maxWidth: 440 }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>✍</div>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 26, fontWeight: 700, color: "#0D0D0D", marginBottom: 12 }}>Your Voice is live.</h2>
            <p style={{ fontSize: 14, color: "#888", lineHeight: 1.7, marginBottom: 28 }}>Your piece has been published to the {ring} ring under your signature. As people read and upvote, it will rise.</p>
            <button onClick={onBack} style={{ background: "#0F1F3D", color: "#FFFFFF", border: "none", borderRadius: 4, padding: "12px 32px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>Back to feed</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F8F6F1", fontFamily: "Inter, sans-serif" }}>
      <style>{FONTS}</style>
      <UnionHeader showBack onBack={onBack} />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 24px" }}>
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 28, fontWeight: 700, color: "#0D0D0D", marginBottom: 6 }}>Write a Voice.</h1>
        <p style={{ fontSize: 14, color: "#888", marginBottom: 28, lineHeight: 1.6 }}>First person. Verified. Signed. Say what you know because you were there.</p>

        {/* Category */}
        <div style={{ background: "#FFFFFF", border: "1px solid #E0DDD5", borderRadius: 6, padding: "20px 24px", marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#AAA", marginBottom: 14 }}>Category</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {Object.entries(categories).map(([key, c]) => (
              <button key={key} onClick={() => setCategory(key)} style={{ padding: "7px 13px", borderRadius: 3, border: `2px solid ${category === key ? c.color : "#E0DDD5"}`, background: category === key ? c.bg : "transparent", color: category === key ? c.color : "#888", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.15s" }}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ring */}
        <div style={{ background: "#FFFFFF", border: "1px solid #E0DDD5", borderRadius: 6, padding: "20px 24px", marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#AAA", marginBottom: 14 }}>Where does this belong?</p>
          <div style={{ display: "flex", gap: 10 }}>
            {[{ key: "local", label: "Local", sub: "Toronto" }, { key: "regional", label: "Regional", sub: "Ontario" }, { key: "global", label: "Global", sub: "Worldwide" }].map(({ key, label, sub }) => (
              <button key={key} onClick={() => setRing(key)} style={{ flex: 1, padding: "12px 8px", border: `2px solid ${ring === key ? "#0F1F3D" : "#E0DDD5"}`, borderRadius: 4, background: ring === key ? "#F0F4FD" : "#FAFAF8", color: ring === key ? "#0F1F3D" : "#888", cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.15s" }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{label}</div>
                <div style={{ fontSize: 10, marginTop: 2, opacity: 0.65 }}>{sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Headline */}
        <div style={{ background: "#FFFFFF", border: "1px solid #E0DDD5", borderRadius: 6, padding: "20px 24px", marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#AAA", marginBottom: 14 }}>Headline</p>
          <input value={headline} onChange={e => setHeadline(e.target.value)} placeholder="Write a headline that earns the read." style={{ width: "100%", border: "1px solid #E0DDD5", borderRadius: 4, padding: "14px", fontSize: 18, fontFamily: "Playfair Display, serif", fontWeight: 700, color: "#0D0D0D", background: "#FAFAF8" }} />
        </div>

        {/* Image */}
        <div style={{ background: "#FFFFFF", border: "1px solid #E0DDD5", borderRadius: 6, padding: "20px 24px", marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#AAA", marginBottom: 6 }}>Image — optional but powerful</p>
          <p style={{ fontSize: 12, color: "#BBB", marginBottom: 14 }}>Must be your own photo. No stock images, no screenshots of other media. By uploading you confirm this image belongs to you.</p>
          <div style={{ width: "100%", height: 120, border: "1px dashed #C8C4BC", borderRadius: 4, background: "#FAFAF8", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <span style={{ fontSize: 13, color: "#C0BDB8" }}>+ Upload your photo</span>
          </div>
        </div>

        {/* Body */}
        <div style={{ background: "#FFFFFF", border: "1px solid #E0DDD5", borderRadius: 6, padding: "20px 24px", marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#AAA", marginBottom: 14 }}>Your piece</p>
          <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Write what you know. First person. No opinion dressed as fact. Say what you actually saw, heard, lived." style={{ width: "100%", height: 280, border: "1px solid #E0DDD5", borderRadius: 4, padding: "14px", fontSize: 15, lineHeight: 1.75, fontFamily: "Inter, sans-serif", color: "#0D0D0D", resize: "none", background: "#FAFAF8" }} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span style={{ fontSize: 11, color: wordCount < 150 ? "#C0392B" : "#1A6B35" }}>{wordCount} / 150 word minimum</span>
            <span style={{ fontSize: 11, color: "#AAA" }}>No maximum — say what needs saying</span>
          </div>
        </div>

        {/* Signature preview */}
        <div style={{ background: "#F8F6F1", border: "1px solid #E0DDD5", borderRadius: 6, padding: "16px 24px", marginBottom: 28, display: "flex", alignItems: "center", gap: 12 }}>
          <div>
            <p style={{ fontSize: 11, color: "#AAA", marginBottom: 4 }}>This will appear as your signature</p>
            <p style={{ fontFamily: "Playfair Display, serif", fontSize: 16, fontWeight: 700, fontStyle: "italic", color: "#0D0D0D" }}>A. Member · Toronto, ON · Verified</p>
          </div>
        </div>

        <button onClick={() => canSubmit && setSubmitted(true)} style={{ width: "100%", background: canSubmit ? "#0F1F3D" : "#C0BDB8", color: "#FFFFFF", border: "none", borderRadius: 4, padding: "15px", fontSize: 14, fontWeight: 700, cursor: canSubmit ? "pointer" : "not-allowed", fontFamily: "Inter, sans-serif", letterSpacing: "0.4px" }}>
          {canSubmit ? "Publish Voice" : `${!category ? "Choose a category" : !ring ? "Choose a ring" : !headline.trim() ? "Add a headline" : `${150 - wordCount} more words needed`}`}
        </button>
        <p style={{ fontSize: 11, color: "#C0BDB8", textAlign: "center", marginTop: 10 }}>Once published your Voice cannot be edited</p>
      </div>
    </div>
  );
}

// ─── ASK VIEW ─────────────────────────────────────────────────────────────────

function AskView({ onBack }) {
  const [category, setCategory] = useState(null);
  const [ring, setRing]         = useState(null);
  const [questionText, setQuestionText] = useState("");
  const [context, setContext]   = useState("");
  const [submitted, setSubmitted] = useState(false);
  const canSubmit = category && ring && questionText.trim().length > 20 && questionText.includes("?");

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "#F8F6F1", display: "flex", flexDirection: "column", fontFamily: "Inter, sans-serif" }}>
        <style>{FONTS}</style>
        <UnionHeader />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ textAlign: "center", maxWidth: 440 }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>✓</div>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 26, fontWeight: 700, color: "#0D0D0D", marginBottom: 12 }}>Question submitted.</h2>
            <p style={{ fontSize: 14, color: "#888", lineHeight: 1.7, marginBottom: 28 }}>Your question is live in the {ring} ring. As people engage and upvote, it will climb.</p>
            <button onClick={onBack} style={{ background: "#0F1F3D", color: "#FFFFFF", border: "none", borderRadius: 4, padding: "12px 32px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>Back to feed</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F8F6F1", fontFamily: "Inter, sans-serif" }}>
      <style>{FONTS}</style>
      <UnionHeader showBack onBack={onBack} />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 24px" }}>
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 28, fontWeight: 700, color: "#0D0D0D", marginBottom: 6 }}>Ask the world.</h1>
        <p style={{ fontSize: 14, color: "#888", marginBottom: 28, lineHeight: 1.6 }}>Genuine questions only — not statements in disguise. Ask what you actually want to know.</p>
        <div style={{ background: "#FFFFFF", border: "1px solid #E0DDD5", borderRadius: 6, padding: "20px 24px", marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#AAA", marginBottom: 14 }}>Category</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {Object.entries(categories).map(([key, c]) => (
              <button key={key} onClick={() => setCategory(key)} style={{ padding: "7px 13px", borderRadius: 3, border: `2px solid ${category === key ? c.color : "#E0DDD5"}`, background: category === key ? c.bg : "transparent", color: category === key ? c.color : "#888", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.15s" }}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ background: "#FFFFFF", border: "1px solid #E0DDD5", borderRadius: 6, padding: "20px 24px", marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#AAA", marginBottom: 14 }}>Where does this belong?</p>
          <div style={{ display: "flex", gap: 10 }}>
            {[{ key: "local", label: "Local", sub: "Toronto" }, { key: "regional", label: "Regional", sub: "Ontario" }, { key: "global", label: "Global", sub: "Worldwide" }].map(({ key, label, sub }) => (
              <button key={key} onClick={() => setRing(key)} style={{ flex: 1, padding: "12px 8px", border: `2px solid ${ring === key ? "#0F1F3D" : "#E0DDD5"}`, borderRadius: 4, background: ring === key ? "#F0F4FD" : "#FAFAF8", color: ring === key ? "#0F1F3D" : "#888", cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.15s" }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{label}</div>
                <div style={{ fontSize: 10, marginTop: 2, opacity: 0.65 }}>{sub}</div>
              </button>
            ))}
          </div>
        </div>
        <div style={{ background: "#FFFFFF", border: "1px solid #E0DDD5", borderRadius: 6, padding: "20px 24px", marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#AAA", marginBottom: 14 }}>Your question</p>
          <textarea value={questionText} onChange={e => setQuestionText(e.target.value)} placeholder="Must end with a question mark. Must be a genuine question." style={{ width: "100%", height: 100, border: "1px solid #E0DDD5", borderRadius: 4, padding: "14px", fontSize: 17, fontFamily: "Playfair Display, serif", fontWeight: 700, color: "#0D0D0D", resize: "none", background: "#FAFAF8", lineHeight: 1.5 }} />
          {questionText.length > 5 && !questionText.includes("?") && (
            <p style={{ fontSize: 11, color: "#C0392B", marginTop: 6 }}>Questions must end with a question mark.</p>
          )}
        </div>
        <div style={{ background: "#FFFFFF", border: "1px solid #E0DDD5", borderRadius: 6, padding: "20px 24px", marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#AAA", marginBottom: 6 }}>Context — optional</p>
          <p style={{ fontSize: 12, color: "#BBB", marginBottom: 12 }}>Factual background only. No opinions. Facts or links that help people understand what they're responding to.</p>
          <textarea value={context} onChange={e => setContext(e.target.value)} placeholder="Add factual context here..." style={{ width: "100%", height: 80, border: "1px solid #E0DDD5", borderRadius: 4, padding: "12px", fontSize: 13, lineHeight: 1.6, fontFamily: "Inter, sans-serif", color: "#0D0D0D", resize: "none", background: "#FAFAF8" }} />
        </div>
        <button onClick={() => canSubmit && setSubmitted(true)} style={{ width: "100%", background: canSubmit ? "#0F1F3D" : "#C0BDB8", color: "#FFFFFF", border: "none", borderRadius: 4, padding: "15px", fontSize: 14, fontWeight: 700, cursor: canSubmit ? "pointer" : "not-allowed", fontFamily: "Inter, sans-serif", letterSpacing: "0.4px" }}>
          {canSubmit ? "Submit Question" : "Complete all fields above"}
        </button>
      </div>
    </div>
  );
}

// ─── WELCOME LANDING PAGE ─────────────────────────────────────────────────────

const clippings = [
  {
    headline: "Voices From the Ground: What Soldiers Say When Nobody Is Listening",
    byline: "M. Okafor · Juba, South Sudan · Field Report",
    body: "In fourteen years of surgery across six conflict zones I have never met a soldier who fully believed the official reason he was there. The bodies on my table do not know what they are fighting for. I do not mean this politically. I mean it literally.",
    tag: "Conflict", rotate: -2.5, top: "4%", left: "-3%", width: 270,
  },
  {
    headline: "My Family Has Farmed This Land for Four Generations. Last Summer We Lost Everything.",
    byline: "R. Castellanos · Oaxaca, Mexico · First Account",
    body: "Our yield was eighteen percent of a normal year. The government sent a representative. He told us this was a temporary setback. He used that exact phrase. He was wearing new boots.",
    tag: "Environment", rotate: 1.8, top: "6%", right: "-2%", width: 255,
  },
  {
    headline: "I Attended Every City Council Meeting for a Year. This Is What I Learned.",
    byline: "T. Nakamura · Toronto, Canada · Observer",
    body: "By the time a vote is called the outcome is almost always determined. The debate is real — but it is the final chapter of a process that began in conversations the public never sees.",
    tag: "Governance", rotate: -1.2, bottom: "20%", left: "-1%", width: 258,
  },
  {
    headline: "Housing Developers and the Rooms the Public Never Enters",
    byline: "Anonymous · Ontario, Canada · Verified",
    body: "The system responds to financial pressure the way water responds to gravity. It finds the path of least resistance, and the path of least resistance runs through people with enough resources to apply it.",
    tag: "Economy", rotate: 2.2, bottom: "16%", right: "-3%", width: 262,
  },
  {
    headline: "Do You Trust the News in Your Country to Report Facts?",
    byline: "Union Poll · 28,917 Verified Responses · Global",
    body: "79% No  ·  14% Yes  ·  7% Unsure\n\n\"I follow three national sources covering the same conflict. They describe three completely different wars.\" — Toronto, Canada",
    tag: "Poll", rotate: -0.8, top: "40%", left: "-4%", width: 232,
  },
];

function Clipping({ c }) {
  const pos = {};
  if (c.top)    pos.top    = c.top;
  if (c.bottom) pos.bottom = c.bottom;
  if (c.left)   pos.left   = c.left;
  if (c.right)  pos.right  = c.right;
  return (
    <div style={{ position: "absolute", ...pos, width: c.width, background: "#FDFAF4", border: "1px solid #C8C0AE", borderRadius: 2, padding: "14px 16px", transform: `rotate(${c.rotate}deg)`, boxShadow: "2px 4px 16px rgba(0,0,0,0.3)", pointerEvents: "none" }}>
      <div style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#999", marginBottom: 6, borderBottom: "1px solid #D8D0C4", paddingBottom: 5 }}>
        Union · {c.tag}
      </div>
      <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 13, fontWeight: 700, lineHeight: 1.35, color: "#0D0D0D", marginBottom: 6 }}>{c.headline}</h3>
      <div style={{ fontSize: 8, color: "#AAA", marginBottom: 7, fontStyle: "italic" }}>{c.byline}</div>
      <div style={{ width: "100%", height: 1, background: "#D8D0C4", marginBottom: 7 }} />
      <p style={{ fontSize: 10, color: "#555", lineHeight: 1.7, whiteSpace: "pre-line" }}>{c.body}</p>
    </div>
  );
}

function WelcomePage({ onJoin, onExplore, onAbout }) {
  return (
    <div style={{ minHeight: "100vh", background: "#1A1A18", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <style>{FONTS}</style>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {clippings.map((c, i) => <Clipping key={i} c={c} />)}
      </div>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(10,22,40,0.88) 0%, rgba(10,22,40,0.6) 52%, rgba(10,22,40,0.1) 100%)" }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px", position: "relative", zIndex: 1 }}>
        <span style={{ fontFamily: "Playfair Display, serif", color: "#FFFFFF", fontSize: 96, fontWeight: 700, letterSpacing: "-3px", lineHeight: 1, display: "block", textAlign: "center", marginBottom: 18 }}>Union</span>
        <div style={{ width: 48, height: 2, background: "rgba(255,255,255,0.2)", marginBottom: 22 }} />
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", textAlign: "center", maxWidth: 380, lineHeight: 1.7, marginBottom: 4, fontWeight: 300 }}>The world is talking.</p>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.88)", textAlign: "center", maxWidth: 380, lineHeight: 1.7, marginBottom: 44, fontWeight: 500 }}>This is where it actually speaks.</p>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, width: "100%", maxWidth: 300 }}>
          <button onClick={onJoin} style={{ width: "100%", background: "#FFFFFF", color: "#0A1628", border: "none", borderRadius: 3, padding: "15px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Inter, sans-serif", letterSpacing: "0.3px" }}
            onMouseEnter={e => e.currentTarget.style.background = "#E8E8E8"}
            onMouseLeave={e => e.currentTarget.style.background = "#FFFFFF"}>
            Join Union
          </button>
          <button onClick={onExplore} style={{ width: "100%", background: "transparent", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 3, padding: "14px", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "Inter, sans-serif" }}
            onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,255,255,0.88)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; }}>
            Explore first — no account needed
          </button>
        </div>
        <div style={{ marginTop: 44, display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
          {["No ads", "No followers", "No algorithm", "Non-profit"].map(item => (
            <span key={item} style={{ fontSize: 11, color: "rgba(255,255,255,0.22)", letterSpacing: "0.3px" }}>{item}</span>
          ))}
        </div>
      </div>
      <div style={{ textAlign: "center", padding: "14px 24px 20px", position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <button onClick={onAbout} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Playfair Display, serif", fontSize: 13, color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}
          onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.75)"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}>
          What we stand for →
        </button>
        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.15)" }}>Est. 2026 · Non-profit · Open source</p>
      </div>
    </div>
  );
}

// ─── PRINCIPLES PAGE ──────────────────────────────────────────────────────────

const principles = [
  {
    numeral: "I",
    title: "What Union Is",
    body: "Union is a global platform for human truth. It exists to give every person on earth an equal, verified, unfiltered voice on the issues that shape their lives. It is not a social network. It is not a media company. It is not a political organization. It is infrastructure for honest human expression — built by people, owned by no one, accountable to everyone.",
  },
  {
    numeral: "II",
    title: "Who Union Belongs To",
    body: "Union belongs to its members and to humanity. No individual, corporation, government or organization owns Union or controls its direction. Union is incorporated as a non-profit. No person will ever profit personally from its operation. Every financial decision is published publicly. Every partnership is approved transparently. The platform exists to serve its mission and nothing else.",
  },
  {
    numeral: "III",
    title: "What Union Will Never Do",
    body: null,
    nevers: [
      "Sell advertising.",
      "Sell user data.",
      "Accept funding from governments or political organizations.",
      "Accept funding from corporations seeking influence over its content.",
      "Suppress a voice because it is inconvenient, uncomfortable or unpopular.",
      "Alter, remove or hide archived content except where legally required — and even then will log that alteration publicly.",
      "Build features designed to maximize time spent on the platform.",
      "Allow any individual to accumulate disproportionate influence through followers, reach or amplification.",
      "Be sold.",
    ],
  },
  {
    numeral: "IV",
    title: "What Union Will Always Do",
    body: null,
    always: [
      "Be transparent about how it works — code, moderation decisions, partnerships and finances are permanently public.",
      "Treat every verified human voice as equal regardless of nationality, language, religion, gender, age, wealth or political belief.",
      "Surface the voices of those directly affected by an issue above those observing from a distance.",
      "Protect the identity of its members — particularly those in places where speaking freely carries personal risk.",
      "Maintain the archive as a permanent public record, free and accessible to all of humanity.",
      "Moderate conduct, never opinion. The answer to speech we disagree with is more speech, not silence.",
      "Publish what it removes, why it removes it, and how members can appeal.",
      "Be accessible — across languages, devices, connection speeds and abilities.",
    ],
  },
  {
    numeral: "V",
    title: "On Free Expression",
    body: "Union was built on the belief that the world is better when people can speak honestly than when they are told what they are permitted to say. We believe the vast majority of humanity is decent, reasonable and capable of recognizing truth when they encounter it. We believe that fringe, hateful and dangerous ideas are most effectively defeated by exposure to the weight of human response — not by being driven underground where they grow without challenge.\n\nUnion will not be the arbiter of acceptable opinion. It will be the mirror in which humanity sees itself clearly, perhaps for the first time.",
  },
  {
    numeral: "VI",
    title: "On Power",
    body: "Union exists because power has become too concentrated — in governments, in corporations, in media, in algorithms owned by people accountable to no one. Union does not seek to replace that power. It seeks to make it answerable. Not through force, not through politics, but through the oldest and most durable force in human history — the weight of what people actually think, said clearly, heard honestly, and recorded permanently.\n\nA government can ignore a protest. It cannot ignore a verified, archived, globally visible record of what its own people believe.",
  },
  {
    numeral: "VII",
    title: "On Sustainability",
    body: "Union will operate on the minimum resources necessary to fulfill its mission. It will seek funding through grants, civil society organizations and voluntary contributions from members who believe in what it is building. It will publish its finances annually. It will never grow for the sake of growth or spend for the sake of status. Every dollar spent will be answerable to the mission.",
  },
  {
    numeral: "VIII",
    title: "On Leadership",
    body: "Union will be governed by an independent board representing academics, human rights practitioners, journalists and elected ordinary members. No single person holds permanent authority over Union's direction. The founder holds no special veto. Leadership serves the principles — the principles do not serve leadership.\n\nWhen decisions are hard — and they will be — this document is the deciding vote.",
  },
  {
    numeral: "IX",
    title: "On the Future",
    body: "Union was built for the long term. Not the next quarter, not the next funding cycle, not the next news cycle. The archive we are building today will be read by people not yet born, about events not yet happened, told by voices that deserve to outlast the moment they spoke in.\n\nWe are not building an app. We are building a record of what humanity actually was — underneath the noise, beneath the spin, beyond the power of anyone to misrepresent.\n\nThat is worth doing carefully. Worth doing honestly. Worth doing right.",
  },
];

function PrinciplesPage({ onBack }) {
  return (
    <div style={{ minHeight: "100vh", background: "#F8F6F1", fontFamily: "Inter, sans-serif" }}>
      <style>{FONTS}</style>

      {/* Header */}
      <header style={{ background: "#0F1F3D", padding: "0 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={onBack} style={{ color: "#8FA8C8", background: "none", border: "none", cursor: "pointer", fontSize: 13, fontFamily: "Inter, sans-serif" }}>← Back</button>
          <span style={{ fontFamily: "Playfair Display, serif", color: "#FFFFFF", fontSize: 42, fontWeight: 700, letterSpacing: "-1px" }}>Union</span>
          <div style={{ minWidth: 60 }} />
        </div>
      </header>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "52px 24px 80px" }}>

        {/* Title block */}
        <div style={{ borderBottom: "3px solid #0D0D0D", paddingBottom: 24, marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#AAA", marginBottom: 12 }}>
            Founding Document · Est. 2026
          </p>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 44, fontWeight: 900, color: "#0D0D0D", lineHeight: 1.15, marginBottom: 16 }}>
            What Union Stands For
          </h1>
          <p style={{ fontSize: 15, color: "#666", lineHeight: 1.8, maxWidth: 560 }}>
            This document exists to protect what Union is, regardless of who leads it, funds it or builds it in the future. It is not a terms of service. It is not a marketing document. It is a promise — to every person who trusts Union with their voice.
          </p>
        </div>

        {/* Principles */}
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {principles.map((p, i) => (
            <div key={p.numeral} style={{ borderTop: i === 0 ? "none" : "1px solid #E0DDD5", paddingTop: i === 0 ? 0 : 48 }}>
              <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: 13, fontWeight: 700, color: "#C0BDB8", minWidth: 24, paddingTop: 6, fontStyle: "italic" }}>
                  {p.numeral}.
                </span>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 22, fontWeight: 700, color: "#0D0D0D", marginBottom: 16, lineHeight: 1.3 }}>
                    {p.title}
                  </h2>

                  {p.body && p.body.split("\n\n").map((para, j) => (
                    <p key={j} style={{ fontSize: 15, color: "#333", lineHeight: 1.85, marginBottom: 16 }}>{para}</p>
                  ))}

                  {p.nevers && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                      {p.nevers.map((item, j) => (
                        <div key={j} style={{ display: "flex", gap: 14, padding: "11px 0", borderBottom: j < p.nevers.length - 1 ? "1px solid #F0EDE6" : "none", alignItems: "flex-start" }}>
                          <span style={{ color: "#C0392B", fontWeight: 700, fontSize: 13, marginTop: 1, flexShrink: 0 }}>✗</span>
                          <span style={{ fontSize: 14, color: "#333", lineHeight: 1.65 }}>Union will never <strong>{item}</strong></span>
                        </div>
                      ))}
                    </div>
                  )}

                  {p.always && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                      {p.always.map((item, j) => (
                        <div key={j} style={{ display: "flex", gap: 14, padding: "11px 0", borderBottom: j < p.always.length - 1 ? "1px solid #F0EDE6" : "none", alignItems: "flex-start" }}>
                          <span style={{ color: "#1A6B35", fontWeight: 700, fontSize: 13, marginTop: 1, flexShrink: 0 }}>✓</span>
                          <span style={{ fontSize: 14, color: "#333", lineHeight: 1.65 }}>Union will always <strong>{item}</strong></span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing */}
        <div style={{ marginTop: 64, borderTop: "3px solid #0D0D0D", paddingTop: 32, textAlign: "center" }}>
          <p style={{ fontFamily: "Playfair Display, serif", fontSize: 16, fontStyle: "italic", color: "#888", lineHeight: 1.8 }}>
            Written by its founders. Binding on everyone who comes after.
          </p>
          <p style={{ fontSize: 12, color: "#C0BDB8", marginTop: 10 }}>Union · Est. 2026 · Non-profit · Open source</p>
        </div>
      </div>
    </div>
  );
}

// ─── ONBOARDING STEP WRAPPER (outside OnboardingFlow to prevent input remount) ──

function OnboardingStepWrap({ step, totalSteps, children }) {
  return (
    <div style={{ minHeight: "100vh", background: "#F8F6F1", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{FONTS}</style>
      <div style={{ background: "#0F1F3D", padding: "0 24px", height: 72, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "Playfair Display, serif", color: "#FFFFFF", fontSize: 42, fontWeight: 700, letterSpacing: "-1px" }}>Union</span>
      </div>
      <div style={{ display: "flex", gap: 4, padding: "16px 24px 0", maxWidth: 480, margin: "0 auto", width: "100%" }}>
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? "#0F1F3D" : "#E0DDD5", transition: "background 0.3s" }} />
        ))}
      </div>
      <div style={{ flex: 1, maxWidth: 480, margin: "0 auto", padding: "32px 24px", width: "100%" }}>
        {children}
      </div>
    </div>
  );
}

// ─── ONBOARDING FLOW ──────────────────────────────────────────────────────────

function OnboardingFlow({ onComplete }) {
  const [step,         setStep]         = useState(0);
  const [phone,        setPhone]        = useState("");
  const [localRing,    setLocalRing]    = useState("");
  const [regionRing,   setRegionRing]   = useState("");
  const [extraRing,    setExtraRing]    = useState("");
  const [verifyChoice, setVerifyChoice] = useState(null);
  const totalSteps = 4;
  const next = () => setStep(s => s + 1);

  if (step === 0) return (
    <OnboardingStepWrap step={step} totalSteps={totalSteps}>
      <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#AAA", marginBottom: 20 }}>Before we begin</p>
      <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 28, fontWeight: 700, color: "#0D0D0D", lineHeight: 1.3, marginBottom: 20 }}>
        We'll ask for your phone number. Here's exactly why.
      </h1>
      <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, marginBottom: 16 }}>
        Union is built on one human, one voice. Your phone number is the only thing standing between an honest platform and one flooded with fake accounts.
      </p>
      <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, marginBottom: 32 }}>
        Your number is <strong>never shared</strong>, never visible, never used to contact you. It exists only to confirm you are a real person. Nothing else.
      </p>
      <div style={{ background: "#FFFFFF", border: "1px solid #E0DDD5", borderRadius: 6, padding: "20px 24px", marginBottom: 24 }}>
        <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#AAA", marginBottom: 14 }}>Your phone number</p>
        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 (416) 000-0000"
          style={{ width: "100%", border: "1px solid #E0DDD5", borderRadius: 4, padding: "13px 14px", fontSize: 16, fontFamily: "Inter, sans-serif", color: "#0D0D0D", background: "#FAFAF8" }} />
        <p style={{ fontSize: 11, color: "#C0BDB8", marginTop: 10 }}>A one-time code will be sent. We'll never message you again.</p>
      </div>
      <button onClick={next} style={{ width: "100%", background: phone.length > 6 ? "#0F1F3D" : "#C0BDB8", color: "#FFFFFF", border: "none", borderRadius: 4, padding: "15px", fontSize: 14, fontWeight: 700, cursor: phone.length > 6 ? "pointer" : "not-allowed", fontFamily: "Inter, sans-serif" }}>
        Send verification code
      </button>
    </OnboardingStepWrap>
  );

  if (step === 1) return (
    <OnboardingStepWrap step={step} totalSteps={totalSteps}>
      <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#AAA", marginBottom: 20 }}>Your rings</p>
      <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 28, fontWeight: 700, color: "#0D0D0D", lineHeight: 1.3, marginBottom: 12 }}>Where do you want to focus?</h1>
      <p style={{ fontSize: 14, color: "#888", lineHeight: 1.7, marginBottom: 28 }}>Union shows you content by geography. Set your rings — you only see what's relevant unless you choose to zoom out.</p>
      <div style={{ position: "relative", width: 180, height: 180, margin: "0 auto 32px" }}>
        {[
          { size: 180, label: "Global",   color: "#E0DDD5", filled: !!extraRing,  fillColor: "#C8D8E8" },
          { size: 124, label: "Regional", color: "#C0BDB8", filled: !!regionRing, fillColor: "#8FA8C8" },
          { size: 68,  label: "Local",    color: "#0F1F3D", filled: !!localRing,  fillColor: "#0F1F3D" },
        ].map(({ size, label, color, filled, fillColor }) => (
          <div key={label} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: size, height: size, borderRadius: "50%", background: filled ? fillColor : "transparent", border: `2px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: filled ? "#FFFFFF" : color, textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { label: "Local",                  ph: "Your city or district (e.g. Toronto)",             val: localRing,  fn: setLocalRing  },
          { label: "Regional",               ph: "Your province, state or country (e.g. Ontario)",   val: regionRing, fn: setRegionRing },
          { label: "A place you care about", ph: "Optional — family abroad, somewhere you've lived", val: extraRing,  fn: setExtraRing  },
        ].map(({ label, ph, val, fn }) => (
          <div key={label}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#888", marginBottom: 6 }}>{label}</p>
            <input value={val} onChange={e => fn(e.target.value)} placeholder={ph}
              style={{ width: "100%", border: "1px solid #E0DDD5", borderRadius: 4, padding: "11px 14px", fontSize: 14, fontFamily: "Inter, sans-serif", color: "#0D0D0D", background: "#FAFAF8" }} />
          </div>
        ))}
      </div>
      <button onClick={next} style={{ width: "100%", marginTop: 24, background: localRing && regionRing ? "#0F1F3D" : "#C0BDB8", color: "#FFFFFF", border: "none", borderRadius: 4, padding: "15px", fontSize: 14, fontWeight: 700, cursor: localRing && regionRing ? "pointer" : "not-allowed", fontFamily: "Inter, sans-serif" }}>
        Set my rings
      </button>
    </OnboardingStepWrap>
  );

  if (step === 2) return (
    <OnboardingStepWrap step={step} totalSteps={totalSteps}>
      <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#AAA", marginBottom: 20 }}>Before you go in</p>
      <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 28, fontWeight: 700, color: "#0D0D0D", lineHeight: 1.3, marginBottom: 28 }}>Union is not like anything you've used before.</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 36 }}>
        {[
          { not: "A social network",  is: "You won't build a following. Nobody knows your name." },
          { not: "A news platform",   is: "No editors. No narrative. Just people saying what they know." },
          { not: "A comment section", is: "No replies. No arguments. No pile-ons." },
          { not: "A product",         is: "No ads. No data sold. Non-profit. Forever." },
          { not: "An echo chamber",   is: "No algorithm. You choose your rings. You choose your focus." },
        ].map(({ not, is }, i) => (
          <div key={not} style={{ display: "flex", gap: 16, background: "#FFFFFF", border: "1px solid #E0DDD5", borderTop: i === 0 ? "1px solid #E0DDD5" : "none", padding: "14px 20px", alignItems: "flex-start" }}>
            <span style={{ fontSize: 12, color: "#C0392B", fontWeight: 600, textDecoration: "line-through", minWidth: 128, flexShrink: 0 }}>{not}</span>
            <span style={{ fontSize: 13, color: "#444", lineHeight: 1.55 }}>{is}</span>
          </div>
        ))}
      </div>
      <button onClick={next} style={{ width: "100%", background: "#0F1F3D", color: "#FFFFFF", border: "none", borderRadius: 4, padding: "15px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
        I understand — take me in
      </button>
    </OnboardingStepWrap>
  );

  if (step === 3) return (
    <OnboardingStepWrap step={step} totalSteps={totalSteps}>
      <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#AAA", marginBottom: 20 }}>One last thing</p>
      <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 28, fontWeight: 700, color: "#0D0D0D", lineHeight: 1.3, marginBottom: 12 }}>How do you want to participate?</h1>
      <p style={{ fontSize: 14, color: "#888", lineHeight: 1.7, marginBottom: 28 }}>You can always upgrade later. Your identity is never made public either way.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
        {[
          { key: "unverified", title: "Browse and read",   desc: "Explore questions and Voices. Respond and submit — responses enter the corroboration queue before surfacing.", badge: null },
          { key: "verified",   title: "Verified member",   desc: "Your responses carry full weight immediately. You can vote in polls. Two minutes — identity sealed and never public.", badge: "Recommended" },
        ].map(({ key, title, desc, badge }) => (
          <div key={key} onClick={() => setVerifyChoice(key)} style={{ background: "#FFFFFF", border: `2px solid ${verifyChoice === key ? "#0F1F3D" : "#E0DDD5"}`, borderRadius: 6, padding: "20px 24px", cursor: "pointer", transition: "border-color 0.15s", position: "relative" }}>
            {badge && <span style={{ position: "absolute", top: -1, right: 16, background: "#0F1F3D", color: "white", fontSize: 9, fontWeight: 700, padding: "3px 8px", letterSpacing: "0.5px", textTransform: "uppercase" }}>{badge}</span>}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${verifyChoice === key ? "#0F1F3D" : "#C0BDB8"}`, background: verifyChoice === key ? "#0F1F3D" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {verifyChoice === key && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} />}
              </div>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#0D0D0D" }}>{title}</span>
            </div>
            <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, paddingLeft: 28 }}>{desc}</p>
          </div>
        ))}
      </div>
      <button onClick={onComplete} style={{ width: "100%", background: verifyChoice ? "#0F1F3D" : "#C0BDB8", color: "#FFFFFF", border: "none", borderRadius: 4, padding: "15px", fontSize: 14, fontWeight: 700, cursor: verifyChoice ? "pointer" : "not-allowed", fontFamily: "Inter, sans-serif" }}>
        Enter Union
      </button>
    </OnboardingStepWrap>
  );

  return null;
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView]                         = useState("welcome");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedVoice, setSelectedVoice]       = useState(null);

  const goFeed    = () => setView("feed");
  const goDetail  = (id) => { setSelectedQuestion(id); setView("question-detail"); };
  const goVoice   = (id) => { setSelectedVoice(id);    setView("voice-detail");    };
  const goRespond = ()   => setView("respond");
  const goCreate  = ()   => setView("create");
  const goAsk     = ()   => setView("ask");
  const goWrite   = ()   => setView("write-voice");
  const goAbout   = ()   => setView("principles");

  if (view === "welcome")
    return <WelcomePage onJoin={() => setView("onboarding")} onExplore={goFeed} onAbout={goAbout} />;
  if (view === "onboarding")
    return <OnboardingFlow onComplete={goFeed} />;
  if (view === "principles")
    return <PrinciplesPage onBack={() => setView(view === "principles" && selectedQuestion ? "feed" : "feed")} />;
  if (view === "question-detail" && selectedQuestion)
    return <QuestionDetailView questionId={selectedQuestion} onBack={goFeed} onRespond={goRespond} />;
  if (view === "voice-detail" && selectedVoice)
    return <VoiceDetailView voiceId={selectedVoice} onBack={goFeed} onSelectQuestion={goDetail} />;
  if (view === "respond" && selectedQuestion)
    return <RespondView questionId={selectedQuestion} onBack={() => goDetail(selectedQuestion)} />;
  if (view === "create")
    return <CreateView onAsk={goAsk} onWriteVoice={goWrite} onBack={goFeed} />;
  if (view === "ask")
    return <AskView onBack={goCreate} />;
  if (view === "write-voice")
    return <WriteVoiceView onBack={goFeed} />;

  return <FeedView onSelectQuestion={goDetail} onSelectVoice={goVoice} onCreate={goCreate} onAbout={goAbout} />;
}
