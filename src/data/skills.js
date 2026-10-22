import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';

/**
 * EDIT ME — add, remove or rename categories and skills freely.
 * The list below is a starting point; keep only what you genuinely know.
 */
export const skillCategories = [
  {
    id: 'programming',
    title: 'Programming',
    icon: CodeRoundedIcon,
    items: ['Python', 'Java', 'C', 'JavaScript'],
  },
  {
    id: 'web',
    title: 'Web Development',
    icon: LanguageRoundedIcon,
    items: ['HTML', 'CSS', 'React', 'Material UI', 'Node.js'],
  },
  {
    id: 'database',
    title: 'Database',
    icon: StorageRoundedIcon,
    items: ['MySQL', 'MongoDB', 'SQL'],
  },
  {
    id: 'aiml',
    title: 'AI / ML',
    icon: PsychologyRoundedIcon,
    items: ['NumPy', 'Pandas', 'scikit-learn', 'Machine Learning basics'],
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: BuildRoundedIcon,
    items: ['Git', 'GitHub', 'VS Code', 'Linux'],
  },
];
