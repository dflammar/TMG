// ── Jobs Data (Static Seed) ──────────────────────────────────
export type Job = {
  id: string;
  title_en: string;
  title_ar: string;
  department_en: string;
  department_ar: string;
  location_en: string;
  location_ar: string;
  type_en: string;
  type_ar: string;
  experience_en: string;
  experience_ar: string;
  description_en: string;
  description_ar: string;
  requirements_en: string[];
  requirements_ar: string[];
  posted: string;
};

export const jobs: Job[] = [
  {
    id: "sales-team-leader",
    title_en: "Sales Team Leader",
    title_ar: "قائد فريق مبيعات",
    department_en: "Sales",
    department_ar: "المبيعات",
    location_en: "Alexandria & New Cairo",
    location_ar: "الإسكندرية والقاهرة الجديدة",
    type_en: "Full-time",
    type_ar: "دوام كامل",
    experience_en: "5–8 years",
    experience_ar: "5–8 سنوات",
    description_en:
      "Lead a high-performing sales team in Egypt's most iconic residential community. You'll drive revenue targets, coach consultants, and represent the TMG standard of excellence in every client interaction.",
    description_ar:
      "قُد فريق مبيعات متميزاً في أكثر المجتمعات السكنية أيقونية في مصر. ستكون مسؤولاً عن تحقيق أهداف الإيرادات وتطوير المستشارين والتمثيل الاحترافي لمعايير مجموعة طلعت مصطفى في كل تعامل مع العملاء.",
    requirements_en: [
      "5+ years in real estate sales",
      "Proven track record of exceeding targets",
      "Strong leadership and coaching skills",
      "Excellent communication in Arabic & English",
      "Bachelor's degree in Business or related field",
    ],
    requirements_ar: [
      "خبرة +5 سنوات في مبيعات العقارات",
      "سجل موثق في تجاوز الأهداف",
      "مهارات قيادة وتدريب قوية",
      "إتقان التواصل باللغتين العربية والإنجليزية",
      "بكالوريوس في إدارة الأعمال أو مجال ذي صلة",
    ],
    posted: "2026-06-01",
  },
  {
    id: "sales-supervisor",
    title_en: "Sales Supervisor",
    title_ar: "مشرف مبيعات",
    department_en: "Sales",
    department_ar: "المبيعات",
    location_en: "Alexandria & North Coast",
    location_ar: "الإسكندرية والساحل الشمالي",
    type_en: "Full-time",
    type_ar: "دوام كامل",
    experience_en: "3–5 years",
    experience_ar: "3–5 سنوات",
    description_en:
      "Supervise daily sales operations at our prestigious North Coast project. Drive team KPIs, ensure premium client experience, and contribute to our growth strategy at SouthMED.",
    description_ar:
      "أشرف على العمليات اليومية للمبيعات في مشروعنا المرموق على الساحل الشمالي. قُد مؤشرات الأداء للفريق وضمن تجربة عملاء متميزة وساهم في استراتيجية النمو لسوث ميد.",
    requirements_en: [
      "3+ years in real estate or luxury sales",
      "Experience managing a team of 5+ members",
      "Strong negotiation skills",
      "Valid driver's license",
      "Willingness to relocate to North Coast during season",
    ],
    requirements_ar: [
      "خبرة +3 سنوات في العقارات أو المبيعات الفاخرة",
      "خبرة في إدارة فريق من +5 أعضاء",
      "مهارات تفاوض قوية",
      "رخصة قيادة سارية",
      "استعداد للعمل في الساحل الشمالي خلال الموسم",
    ],
    posted: "2026-06-05",
  },
  {
    id: "marketing-manager",
    title_en: "Marketing Manager",
    title_ar: "مدير تسويق",
    department_en: "Marketing",
    department_ar: "التسويق",
    location_en: "Alexandria & New Cairo",
    location_ar: "الإسكندرية والقاهرة الجديدة",
    type_en: "Full-time",
    type_ar: "دوام كامل",
    experience_en: "6–10 years",
    experience_ar: "6–10 سنوات",
    description_en:
      "Lead integrated marketing campaigns for TMG's flagship projects. You'll oversee digital and offline channels, brand management, and strategic partnerships to strengthen TMG's market leadership.",
    description_ar:
      "قُد الحملات التسويقية المتكاملة لمشاريع مجموعة طلعت مصطفى الرئيسية. ستشرف على القنوات الرقمية والتقليدية وإدارة العلامة التجارية والشراكات الاستراتيجية.",
    requirements_en: [
      "6+ years in marketing, 3+ in real estate",
      "Expertise in digital marketing and performance campaigns",
      "Strong analytical and data-driven mindset",
      "MBA or equivalent preferred",
      "Fluency in Arabic and English",
    ],
    requirements_ar: [
      "خبرة +6 سنوات في التسويق، منها +3 في العقارات",
      "خبرة في التسويق الرقمي وحملات الأداء",
      "تفكير تحليلي قائم على البيانات",
      "ماجستير إدارة أعمال أو ما يعادله يُفضَّل",
      "إتقان العربية والإنجليزية",
    ],
    posted: "2026-06-08",
  },
  {
    id: "project-engineer",
    title_en: "Senior Project Engineer",
    title_ar: "مهندس مشاريع أول",
    department_en: "Engineering",
    department_ar: "الهندسة",
    location_en: "Alexandria & New Cairo",
    location_ar: "الإسكندرية والقاهرة الجديدة",
    type_en: "Full-time",
    type_ar: "دوام كامل",
    experience_en: "7–12 years",
    experience_ar: "7–12 سنة",
    description_en:
      "Oversee execution of large-scale residential and commercial construction within Madinaty. Ensure quality, timelines, and safety standards are upheld at all project phases.",
    description_ar:
      "أشرف على تنفيذ مشاريع البناء السكنية والتجارية الضخمة داخل مدينتي. ضمان الجودة والالتزام بالمواعيد ومعايير السلامة في جميع مراحل المشروع.",
    requirements_en: [
      "B.Sc. in Civil Engineering",
      "7+ years in large-scale construction",
      "Proficiency in AutoCAD, MS Project",
      "PMP certification is a plus",
      "Strong site management experience",
    ],
    requirements_ar: [
      "بكالوريوس هندسة مدنية",
      "خبرة +7 سنوات في البناء الضخم",
      "إتقان AutoCAD وMS Project",
      "شهادة PMP ميزة إضافية",
      "خبرة قوية في إدارة المواقع",
    ],
    posted: "2026-06-10",
  },
  {
    id: "hr-specialist",
    title_en: "HR Business Partner",
    title_ar: "شريك أعمال الموارد البشرية",
    department_en: "Human Resources",
    department_ar: "الموارد البشرية",
    location_en: "Alexandria & New Cairo",
    location_ar: "الإسكندرية والقاهرة الجديدة",
    type_en: "Full-time",
    type_ar: "دوام كامل",
    experience_en: "4–7 years",
    experience_ar: "4–7 سنوات",
    description_en:
      "Partner with business leaders to drive talent acquisition, employee engagement, and HR strategy. You'll play a key role in shaping TMG's organizational culture and people excellence.",
    description_ar:
      "تعاون مع قادة الأعمال لتعزيز اكتساب المواهب ومشاركة الموظفين واستراتيجية الموارد البشرية. ستكون له دور محوري في تشكيل ثقافة مجموعة طلعت مصطفى وتميز العنصر البشري.",
    requirements_en: [
      "4+ years in HRBP or generalist HR role",
      "Strong knowledge of Egyptian labor law",
      "Experience with HRIS systems",
      "Excellent interpersonal and facilitation skills",
      "Bachelor's in HR Management or related field",
    ],
    requirements_ar: [
      "خبرة +4 سنوات في HRBP أو دور عام في الموارد البشرية",
      "معرفة قوية بقانون العمل المصري",
      "خبرة مع أنظمة HRIS",
      "مهارات تواصل وتيسير ممتازة",
      "بكالوريوس إدارة موارد بشرية أو ذا صلة",
    ],
    posted: "2026-06-12",
  },
  {
    id: "customer-experience",
    title_en: "Customer Experience Lead",
    title_ar: "مسؤول تجربة العملاء",
    department_en: "Customer Service",
    department_ar: "خدمة العملاء",
    location_en: "Alexandria & New Cairo",
    location_ar: "الإسكندرية والقاهرة الجديدة",
    type_en: "Full-time",
    type_ar: "دوام كامل",
    experience_en: "3–6 years",
    experience_ar: "3–6 سنوات",
    description_en:
      "Champion the end-to-end customer journey for TMG residents. From handover to after-sales, you'll ensure every homeowner experiences the TMG promise of unmatched service quality.",
    description_ar:
      "كن مسؤولاً عن رحلة العميل الكاملة لسكان مجموعة طلعت مصطفى. من تسليم الوحدة إلى ما بعد البيع، ستضمن حصول كل مالك منزل على وعد طلعت مصطفى بجودة خدمة لا مثيل لها.",
    requirements_en: [
      "3+ years in customer service or CX",
      "Experience in real estate or hospitality preferred",
      "Data-driven approach to CX improvement",
      "Strong Arabic and English communication",
      "Proficiency in CRM systems",
    ],
    requirements_ar: [
      "خبرة +3 سنوات في خدمة العملاء أو تجربة العملاء",
      "خبرة في العقارات أو الضيافة يُفضَّل",
      "نهج قائم على البيانات لتحسين تجربة العملاء",
      "تواصل قوي بالعربية والإنجليزية",
      "إتقان أنظمة CRM",
    ],
    posted: "2026-06-14",
  },
];

export const departments_en = ["All Departments", "Sales", "Marketing", "Engineering", "Human Resources", "Customer Service"];
export const departments_ar = ["جميع الأقسام", "المبيعات", "التسويق", "الهندسة", "الموارد البشرية", "خدمة العملاء"];
