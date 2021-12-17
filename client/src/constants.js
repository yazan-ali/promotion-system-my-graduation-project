const rankOptions = [
    { key: 'معلم', value: 'معلم', text: 'معلم' },
    { key: 'أستاذ مساعد', value: 'أستاذ مساعد', text: 'أستاذ مساعد' },
    { key: 'أستاذ مشارك', value: 'أستاذ مشارك', text: 'أستاذ مشارك' },
    { key: 'أستاذ جامعي', value: 'أستاذ جامعي', text: 'أستاذ جامعي' },
]


const collegeOptions = [
    { key: 'IT', value: 'تكنولوجيا المعلومات', text: 'تكنولوجيا المعلومات' },
    { key: 'FinanceAndBusiness', value: 'المال والأعمال', text: 'المال والأعمال' },
    { key: 'ShariaAndLaw', value: 'الشيخ نوح القضاة للشريعة والقانون', text: 'الشيخ نوح القضاة للشريعة والقانون' },
    { key: 'ArtsAndSciences', value: 'الآداب والعلوم', text: 'الآداب والعلوم' },
    { key: 'EducationalSciences', value: 'العلوم التربوية', text: 'العلوم التربوية' },
    { key: 'IslamicArtandArchitecture', value: 'الفنون والعمارة الإسلامية', text: 'الفنون والعمارة الإسلامية' },
    { key: 'Dawah', value: 'كلية الدعوة وأصول الدين', text: 'كلية الدعوة وأصول الدين' },
    { key: 'Maliki', value: 'الفقه المالكي', text: 'الفقه المالكي' },
    { key: 'Hanafi', value: 'الفقه الشافعي', text: 'الفقه الشافعي' },
    { key: 'Shafi', value: 'الفقه الحنفي', text: 'الفقه الحنفي' },
]

const sectionOptions = {
    IT: [
        { key: 'علم الحاسوب', value: 'علم الحاسوب', text: 'علم الحاسوب' },
        { key: 'هندسة البرمجيات', value: 'هندسة البرمجيات', text: 'هندسة البرمجيات' },
        { key: 'نظم المعلومات والشبكات', value: 'نظم المعلومات والشبكات', text: 'نظم المعلومات والشبكات' },
        { key: 'آمن المعلومات', value: 'آمن المعلومات', text: 'آمن المعلومات' },
    ],
    FinanceAndBusiness: [
        { key: 'قسم الادارة', value: 'قسم الادارة', text: 'قسم الادارة' },
        { key: 'قسم المصارف الاسلامية', value: 'قسم المصارف الاسلامية', text: 'قسم المصارف الاسلامية' },
        { key: 'قسم نظم المعلومات الإدارية', value: 'قسم نظم المعلومات الإدارية', text: 'قسم نظم المعلومات الإدارية' },
        { key: 'قسم المحاسبة', value: 'قسم المحاسبة', text: 'قسم المحاسبة' },
        { key: 'قسم العلوم المالية والمصرفية', value: 'قسم العلوم المالية والمصرفية', text: 'قسم العلوم المالية والمصرفية' },
    ],
    ArtsAndSciences: [
        { key: 'قسم التاريخ والحضارة الإسلامية', value: 'قسم التاريخ والحضارة الإسلامية', text: 'قسم التاريخ والحضارة الإسلامية' },
        { key: 'قسم اللغة العربية وآدابها', value: 'قسم اللغة العربية وآدابها', text: 'قسم اللغة العربية وآدابها' },
        { key: 'قسم اللغة الإنجليزية', value: 'قسم اللغة الإنجليزية', text: 'قسم اللغة الإنجليزية' },
        { key: 'قسم العلوم الإنسانية', value: 'قسم العلوم الإنسانية', text: 'قسم العلوم الإنسانية' },
        { key: 'قسم الخدمات الأكاديمية', value: 'قسم الخدمات الأكاديمية', text: 'قسم الخدمات الأكاديمية' },
    ],
    ShariaAndLaw: [
        { key: 'قسم الفقه وأصوله', value: 'قسم الفقه وأصوله', text: 'قسم الفقه وأصوله' },
        { key: 'قسم القانون المقارن', value: 'قسم القانون المقارن', text: 'قسم القانون المقارن' },
    ],
    EducationalSciences: [
        { key: 'قسم الإرشاد والصحة النفسية', value: 'قسم الإرشاد والصحة النفسية', text: 'قسم الإرشاد والصحة النفسية' },
        { key: 'قسم التربية الخاصة', value: 'قسم التربية الخاصة', text: 'قسم التربية الخاصة' },
        { key: 'قسم المناهج والتدريس', value: 'قسم المناهج والتدريس', text: 'قسم المناهج والتدريس' },
    ],
    IslamicArtandArchitecture: [
        { key: 'قسم الفنون الإسلامية والتطبيقية', value: 'قسم الفنون الإسلامية والتطبيقية', text: 'قسم الفنون الإسلامية والتطبيقية' },
    ],
    Dawah: [
        { key: 'قسم أصول الدين', value: 'قسم أصول الدين', text: 'قسم أصول الدين' },
        { key: 'قسم القراءات والدراسات القرآنية', value: 'قسم القراءات والدراسات القرآنية', text: 'قسم القراءات والدراسات القرآنية' },
        { key: 'قسم الدعوة والإعلام الإسلامي', value: 'قسم الدعوة والإعلام الإسلامي', text: 'قسم الدعوة والإعلام الإسلامي' },
    ],
    Maliki: [
        { key: 'قسم الفقه المالكي', value: 'قسم الفقه المالكي', text: 'قسم الفقه المالكي' },
    ],
    Hanafi: [
        { key: 'قسم الفقه الحنفي', value: 'قسم الفقه الحنفي', text: 'قسم الفقه الحنفي' },
        { key: 'قسم القضاء والإفتاء الشرعي', value: 'قسم القضاء والإفتاء الشرعي', text: 'قسم القضاء والإفتاء الشرعي' },
        { key: 'قسم الإصلاح والوفاق الأسري الشرعي', value: 'قسم الإصلاح والوفاق الأسري الشرعي', text: 'قسم الإصلاح والوفاق الأسري الشرعي' },
    ],
    Shafi: [
        { key: 'قسم الفقه الشافعي', value: 'قسم الفقه الشافعي', text: 'قسم الفقه الشافعي' },
    ]
}

const ranks = {
    1: "رئيس القسم",
    2: "العميد",
    3: "رئاسة الجامعة"
}

const research_types = [
    { key: 'alone', value: 'منفرد', text: 'منفرد' },
    { key: 'not alone', value: 'غير منفرد', text: 'غير منفرد' },
]

const is_research_specialty = [
    { key: 'yes', value: true, text: 'نعم' },
    { key: 'no', value: false, text: 'لا' },
]

const memberDecision = {
    "approved": "تم الموافقة على الطلب",
    "rejected": "لم يتم الموافقة على الطلب"
}

export { rankOptions, collegeOptions, sectionOptions, ranks, research_types, is_research_specialty, memberDecision }