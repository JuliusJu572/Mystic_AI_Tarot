export type Language = 'en' | 'zh';

export const translations = {
  en: {
    title: 'MYSTIC',
    subtitle: 'Ask the Oracle',
    tagline: 'Past • Present • Future',
    placeholder: 'Focus on your question...',
    beginBtn: 'Begin Reading',
    shuffling: 'Shuffling Fate...',
    selectTitle: 'Select 3 Cards',
    selectedCount: (count: number) => `${count} / 3 Selected`,
    past: 'The Past',
    present: 'The Present',
    future: 'The Future',
    consulting: 'Consulting the Stars...',
    newReading: 'New Reading',
    error: 'The spirits are silent. Please try again.',
  },
  zh: {
    title: '神秘塔罗',
    subtitle: '问卜命运',
    tagline: '过去 • 现在 • 未来',
    placeholder: '在此输入你的问题...',
    beginBtn: '开始占卜',
    shuffling: '洗牌中...',
    selectTitle: '请选择三张牌',
    selectedCount: (count: number) => `已选 ${count} / 3 张`,
    past: '过去',
    present: '现在',
    future: '未来',
    consulting: '正在解读星象...',
    newReading: '重新占卜',
    error: '灵视受阻，请重试。',
  }
};
