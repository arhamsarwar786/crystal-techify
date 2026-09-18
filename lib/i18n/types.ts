export type Block = { title: string; body: string };

export type ServiceCopy = {
  title: string;
  description: string;
  overview: string;
  capabilities: string[];
  deliverables: string[];
  problem?: string;
  challenges?: Block[];
  method?: Block[];
  useCases?: Block[];
};

export type IndustryCopy = {
  name: string;
  description: string;
  overview?: string;
  challenges?: Block[];
  approach?: Block[];
  outcomes?: string[];
};

export type CaseCopy = {
  name: string;
  category: string;
  summary: string;
  outcome: string;
  timeline: string;
  teamSize: string;
  tags: string[];
  brief?: string;
  context?: string;
  challenges?: Block[];
  approach?: Block[];
  shipped?: string[];
  stack?: string[];
};

export type Titled = { title: string; description: string };
export type TitleBody = { title: string; body: string };

export type Messages = {
  heroTitle: string;
  heroWords: readonly string[];
  heroBody: string;
  heroSlides: readonly { title: string; body: string }[];
  bookDemo: string;
  clientsHeadline: string;
  clientsBody: string;
  nav: Record<string, string>;

  common: {
    exploreMore: string;
    overview: string;
    talkToUs: string;
    getInTouch: string;
    viewDetails: string;
    viewRole: string;
    applyNow: string;
    viewOpenRoles: string;
    allRoles: string;
    allRights: string;
    builtIn: string;
    lastUpdated: string;
    selectLanguage: string;
    openMenu: string;
    closeMenu: string;
    homeAria: string;
    showLinks: string;
    hideLinks: string;
    step: string;
    bestFor: string;
    service: string;
    industry: string;
    outcome: string;
    openPdf: string;
    iso: string;
    free90: string;
    forExecutives: string;
    forTechnical: string;
    tools: string;
    whatYouGet: string;
    otherServices: string;
    otherIndustries: string;
    problemsWeTake: string;
    problemsWeTakeBody: string;
    howWeWork: string;
    howWeWorkService: string;
    typicalWork: string;
    typicalWorkBody: string;
    problemsWeSee: string;
    problemsWeSeeBody: string;
    howWeWorkIndustry: string;
    outcomesAim: string;
    whereWeFocus: string;
    caseStudy: string;
    client: string;
    engagement: string;
    team: string;
    theBrief: string;
    theBriefBody: string;
    theContext: string;
    howWeDelivered: string;
    howWeDeliveredBody: string;
    whatShipped: string;
    theStack: string;
    otherCases: string;
    lookingServices: string;
    browseServices: string;
    companyAboutExtra: string;
  };

  footer: {
    haveProduct: string;
    talkFirst: string;
    contact: string;
  };

  snapshot: {
    kicker: string;
    title: string;
    description: string;
    commitment: string;
    closing: string;
    hudKicker: string;
    hudCaption: string;
    stats: { value: string; label: string; animate: boolean }[];
  };

  services: {
    title: string;
    description: string;
    discoverCapabilities: string;
    kicker: string;
    headline: string;
    headlineAccent: string;
    exploreAll: string;
    kickers: Record<string, string>;
  };

  cases: {
    title: string;
    description: string;
  };

  engagement: {
    title: string;
    description: string;
    auditKicker: string;
    auditTitle: string;
    auditBody: string;
  };

  expert: {
    title: string;
    body: string;
    points: string[];
  };

  partnerships: {
    title: string;
    description: string;
    items: TitleBody[];
  };

  about: {
    title: string;
  };

  presence: {
    title: string;
    description: string;
    location: string;
    extraStat: string;
  };

  advantages: {
    title: string;
    description: string;
  };

  process: {
    title: string;
    description: string;
  };

  industries: {
    title: string;
    description: string;
  };

  tech: {
    title: string;
    description: string;
    groups: { key: string; title: string }[];
  };

  testimonials: {
    title: string;
    description: string;
    pageDescription: string;
  };

  contact: {
    title: string;
    description: string;
    sessionBody: string;
    email: string;
    call: string;
    where: string;
    successTitle: string;
    successBody: string;
    sendAnother: string;
    readyTitle: string;
    readyBody: string;
    copied: string;
    copy: string;
    openEmail: string;
    editAnother: string;
    name: string;
    emailLabel: string;
    company: string;
    optional: string;
    whatNeed: string;
    message: string;
    messageHint: string;
    sending: string;
    send: string;
    inboxNote: string;
    mailtoNote: string;
    errName: string;
    errEmail: string;
    errMessage: string;
    projectTypes: string[];
    engagementPrefix: string;
  };

  careers: {
    kicker: string;
    title: string;
    body: string;
    storyKicker: string;
    storyTitle: string;
    story: string;
    highlights: TitleBody[];
    facts: { value: string; label: string }[];
    teamsKicker: string;
    teamsTitle: string;
    teamsBody: string;
    teams: TitleBody[];
    cultureKicker: string;
    cultureTitle: string;
    cultureBody: string;
    culture: TitleBody[];
    hiringKicker: string;
    hiringTitle: string;
    hiringBody: string;
    hiring: TitleBody[];
    dbDown: string;
    empty: string;
    jobDbDown: string;
    doTitle: string;
    lookTitle: string;
    niceTitle: string;
    benefitsTitle: string;
    applyTitle: string;
    applyBody: string;
    applyBodyQ: string;
    already: string;
    loginToApply: string;
    signUp: string;
    or: string;
  };

  apply: {
    phone: string;
    cover: string;
    cv: string;
    pending: string;
    submit: string;
    received: string;
    errPhone: string;
    errCvMissing: string;
    errCvType: string;
    errCvSize: string;
    errDb: string;
    errSubmit: string;
    requiredQ: string;
  };

  auth: {
    login: string;
    adminLogin: string;
    signup: string;
    loginBody: string;
    adminBody: string;
    signupBody: string;
    fullName: string;
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    passwordHint: string;
    wait: string;
    createAccount: string;
    noAccount: string;
    signUp: string;
    already: string;
    logIn: string;
    logOut: string;
    admin: string;
    server: string;
    generic: string;
    errors: Record<string, string>;
  };

  legal: {
    privacyTitle: string;
    privacyIntro: string;
    termsTitle: string;
    termsIntro: string;
    privacy: { heading: string; body: string }[];
    terms: { heading: string; body: string }[];
  };

  companyAbout: string;
  companyTagline: string;

  serviceItems: Record<string, ServiceCopy>;
  industryItems: Record<string, IndustryCopy>;
  caseItems: Record<string, CaseCopy>;
  categories: Record<string, string>;
  mission: Titled[];
  journey: Titled[];
  advantageItems: Titled[];
  processSteps: Titled[];
  engagementModels: Record<
    string,
    {
      title: string;
      description: string;
      bestFor: string;
      points?: string[];
      qualifierLabel?: string;
      qualifierOptions?: string[];
    }
  >;
  auditExec: string[];
  auditTech: string[];
  testimonialsItems: { quote: string; role: string }[];
  trust: string[];
};

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends readonly (infer U)[]
    ? DeepPartial<U>[]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};
