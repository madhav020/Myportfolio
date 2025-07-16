import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ExternalLink, Mail, Github, Linkedin, MapPin, Download } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

interface TerminalProps {}

interface Theme {
  name: string;
  bg: string;
  text: string;
  accent: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  link: string;
  prompt: string;
  username: string;
  hostname: string;
  welcomeArt: string[];
  personality: string;
  commandPrefix: string;
  loadingText: string;
  successIcon: string;
  errorIcon: string;
}

const themes: Record<string, Theme> = {
  matrix: {
    name: 'Matrix Green',
    bg: 'bg-black',
    text: 'text-green-400',
    accent: 'text-cyan-400',
    secondary: 'text-gray-300',
    success: 'text-green-300',
    warning: 'text-yellow-400',
    error: 'text-red-400',
    link: 'text-blue-400',
    prompt: 'text-green-400',
    username: 'neo',
    hostname: 'matrix',
    personality: 'Welcome to the Matrix. Reality is what you make of it.',
    commandPrefix: '$',
    loadingText: 'Accessing mainframe...',
    successIcon: '✓',
    errorIcon: '✗',
    welcomeArt: [
      '╔═══════════════════════════════════════════════════════════════════════════════╗',
      '║                    ███╗   ███╗ █████╗ ████████╗██████╗ ██╗██╗  ██╗           ║',
      '║                    ████╗ ████║██╔══██╗╚══██╔══╝██╔══██╗██║╚██╗██╔╝           ║',
      '║                    ██╔████╔██║███████║   ██║   ██████╔╝██║ ╚███╔╝            ║',
      '║                    ██║╚██╔╝██║██╔══██║   ██║   ██╔══██╗██║ ██╔██╗            ║',
      '║                    ██║ ╚═╝ ██║██║  ██║   ██║   ██║  ██║██║██╔╝ ██╗           ║',
      '║                    ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝           ║',
      '║                           Welcome to the Real World                          ║',
      '╚═══════════════════════════════════════════════════════════════════════════════╝'
    ]
  },
  cyberpunk: {
    name: 'Cyberpunk 2077',
    bg: 'bg-purple-900',
    text: 'text-pink-400',
    accent: 'text-cyan-300',
    secondary: 'text-purple-200',
    success: 'text-pink-300',
    warning: 'text-yellow-300',
    error: 'text-red-300',
    link: 'text-blue-300',
    prompt: 'text-pink-400',
    username: 'netrunner',
    hostname: 'nightcity',
    personality: 'Welcome to Night City, choom. The future is now.',
    commandPrefix: '>',
    loadingText: 'Jacking into the Net...',
    successIcon: '◉',
    errorIcon: '◈',
    welcomeArt: [
      '╔═══════════════════════════════════════════════════════════════════════════════╗',
      '║    ▄████▄▓██   ██▓ ▄▄▄▄   ▓█████  ██▀███   ██▓███   █    ██  ███▄    █     ║',
      '║   ▒██▀ ▀█ ▒██  ██▒▓█████▄ ▓█   ▀ ▓██ ▒ ██▒▓██░  ██▒ ██  ▓██▒ ██ ▀█   █     ║',
      '║   ▒▓█    ▄ ▒██ ██░▒██▒ ▄██▒███   ▓██ ░▄█ ▒▓██░ ██▓▒▓██  ▒██░▓██  ▀█ ██▒    ║',
      '║   ▒▓▓▄ ▄██▒░ ▐██▓░▒██░█▀  ▒▓█  ▄ ▒██▀▀█▄  ▒██▄█▓▒ ▒▓▓█  ░██░▓██▒  ▐▌██▒    ║',
      '║   ▒ ▓███▀ ░░ ██▒▓░░▓█  ▀█▓░▒████▒░██▓ ▒██▒▒██▒ ░  ░▒▒█████▓ ▒██░   ▓██░    ║',
      '║   ░ ░▒ ▒  ░ ██▒▒▒ ░▒▓███▀▒░░ ▒░ ░░ ▒▓ ░▒▓░▒▓▒░ ░  ░░▒▓▒ ▒ ▒ ░ ▒░   ▒ ▒     ║',
      '║     ░  ▒  ▓██ ░▒░ ▒░▒   ░  ░ ░  ░  ░▒ ░ ▒░░▒ ░     ░░▒░ ░ ░ ░ ░░   ░ ▒░    ║',
      '║                        NIGHT CITY TERMINAL v2077                            ║',
      '╚═══════════════════════════════════════════════════════════════════════════════╝'
    ]
  },
  hacker: {
    name: 'Elite Hacker',
    bg: 'bg-gray-900',
    text: 'text-green-500',
    accent: 'text-lime-400',
    secondary: 'text-green-200',
    success: 'text-green-400',
    warning: 'text-yellow-500',
    error: 'text-red-500',
    link: 'text-blue-400',
    prompt: 'text-green-500',
    username: 'h4ck3r',
    hostname: 'darkweb',
    personality: 'Access granted. You are now in the underground.',
    commandPrefix: '#',
    loadingText: 'Bypassing firewall...',
    successIcon: '[+]',
    errorIcon: '[!]',
    welcomeArt: [
      '╔═══════════════════════════════════════════════════════════════════════════════╗',
      '║    ██░ ██  ▄▄▄       ▄████▄   ██ ▄█▀▓█████  ██▀███      ▄▄▄█████▓▓█████     ║',
      '║   ▓██░ ██▒▒████▄    ▒██▀ ▀█   ██▄█▒ ▓█   ▀ ▓██ ▒ ██▒    ▓  ██▒ ▓▒▓█   ▀     ║',
      '║   ▒██▀▀██░▒██  ▀█▄  ▒▓█    ▄ ▓███▄░ ▒███   ▓██ ░▄█ ▒    ▒ ▓██░ ▒░▒███       ║',
      '║   ░▓█ ░██ ░██▄▄▄▄██ ▒▓▓▄ ▄██▒▓██ █▄ ▒▓█  ▄ ▒██▀▀█▄      ░ ▓██▓ ░ ▒▓█  ▄     ║',
      '║   ░▓█▒░██▓ ▓█   ▓██▒▒ ▓███▀ ░▒██▒ █▄░▒████▒░██▓ ▒██▒      ▒██▒ ░ ░▒████▒    ║',
      '║    ▒ ░░▒░▒ ▒▒   ▓▒█░░ ░▒ ▒  ░▒ ▒▒ ▓▒░░ ▒░ ░░ ▒▓ ░▒▓░      ▒ ░░   ░░ ▒░ ░    ║',
      '║    ▒ ░▒░ ░  ▒   ▒▒ ░  ░  ▒   ░ ░▒ ▒░ ░ ░  ░  ░▒ ░ ▒░        ░     ░ ░  ░    ║',
      '║                      UNAUTHORIZED ACCESS DETECTED                           ║',
      '╚═══════════════════════════════════════════════════════════════════════════════╝'
    ]
  },
  retro: {
    name: 'Retro Terminal',
    bg: 'bg-yellow-900',
    text: 'text-yellow-300',
    accent: 'text-orange-300',
    secondary: 'text-yellow-100',
    success: 'text-yellow-200',
    warning: 'text-orange-400',
    error: 'text-red-400',
    link: 'text-orange-200',
    prompt: 'text-yellow-300',
    username: 'user',
    hostname: 'retro-pc',
    personality: 'Welcome to the golden age of computing.',
    commandPrefix: 'C:\\>',
    loadingText: 'Loading from floppy disk...',
    successIcon: 'OK',
    errorIcon: 'ERR',
    welcomeArt: [
      '╔═══════════════════════════════════════════════════════════════════════════════╗',
      '║    ██▀███  ▓█████▄▄▄█████▓ ██▀███   ▒█████      ██▓███   ▄████▄             ║',
      '║   ▓██ ▒ ██▒▓█   ▀▓  ██▒ ▓▒▓██ ▒ ██▒▒██▒  ██▒   ▓██░  ██▒▒██▀ ▀█             ║',
      '║   ▓██ ░▄█ ▒▒███  ▒ ▓██░ ▒░▓██ ░▄█ ▒▒██░  ██▒   ▓██░ ██▓▒▒▓█    ▄            ║',
      '║   ▒██▀▀█▄  ▒▓█  ▄░ ▓██▓ ░ ▒██▀▀█▄  ▒██   ██░   ▒██▄█▓▒ ▒▒▓▓▄ ▄██▒           ║',
      '║   ░██▓ ▒██▒░▒████▒ ▒██▒ ░ ░██▓ ▒██▒░ ████▓▒░   ▒██▒ ░  ░▒ ▓███▀ ░           ║',
      '║   ░ ▒▓ ░▒▓░░░ ▒░ ░ ▒ ░░   ░ ▒▓ ░▒▓░░ ▒░▒░▒░    ▒▓▒░ ░  ░░ ░▒ ▒  ░           ║',
      '║     ░▒ ░ ▒░ ░ ░  ░   ░      ░▒ ░ ▒░  ░ ▒ ▒░    ░▒ ░       ░  ▒              ║',
      '║                        MS-DOS 6.22 COMPATIBLE                               ║',
      '╚═══════════════════════════════════════════════════════════════════════════════╝'
    ]
  },
  ocean: {
    name: 'Deep Ocean',
    bg: 'bg-blue-900',
    text: 'text-blue-300',
    accent: 'text-cyan-200',
    secondary: 'text-blue-100',
    success: 'text-blue-200',
    warning: 'text-yellow-300',
    error: 'text-red-300',
    link: 'text-cyan-300',
    prompt: 'text-blue-300',
    username: 'diver',
    hostname: 'deepblue',
    personality: 'Diving into the depths of the digital ocean.',
    commandPrefix: '~$',
    loadingText: 'Surfacing data...',
    successIcon: '◊',
    errorIcon: '◈',
    welcomeArt: [
      '╔═══════════════════════════════════════════════════════════════════════════════╗',
      '║     ▒█████   ▄████▄  ▓█████ ▄▄▄      ███▄    █     ▄▄▄█████▓▓█████ ██▀███   ║',
      '║    ▒██▒  ██▒▒██▀ ▀█  ▓█   ▀▒████▄    ██ ▀█   █     ▓  ██▒ ▓▒▓█   ▀▓██ ▒ ██▒ ║',
      '║    ▒██░  ██▒▒▓█    ▄ ▒███  ▒██  ▀█▄ ▓██  ▀█ ██▒    ▒ ▓██░ ▒░▒███  ▓██ ░▄█ ▒ ║',
      '║    ▒██   ██░▒▓▓▄ ▄██▒▒▓█  ▄░██▄▄▄▄██▓██▒  ▐▌██▒    ░ ▓██▓ ░ ▒▓█  ▄▒██▀▀█▄   ║',
      '║    ░ ████▓▒░▒ ▓███▀ ░░▒████▒▓█   ▓██▒██░   ▓██░      ▒██▒ ░ ░▒████░██▓ ▒██▒ ║',
      '║    ░ ▒░▒░▒░ ░ ░▒ ▒  ░░░ ▒░ ░▒▒   ▓▒█░ ▒░   ▒ ▒       ▒ ░░   ░░ ▒░ ░ ▒▓ ░▒▓░ ║',
      '║      ░ ▒ ▒░   ░  ▒    ░ ░  ░ ▒   ▒▒ ░ ░░   ░ ▒░        ░     ░ ░  ░ ░▒ ░ ▒░ ║',
      '║                        DEEP OCEAN RESEARCH STATION                          ║',
      '╚═══════════════════════════════════════════════════════════════════════════════╝'
    ]
  }
};

const Terminal: React.FC<TerminalProps> = () => {
  const [currentPath, setCurrentPath] = useState('~');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentCommand, setCurrentCommand] = useState('');
  const [output, setOutput] = useState<JSX.Element[]>([]);
  const [currentTheme, setCurrentTheme] = useState<string>('matrix');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const theme = themes[currentTheme];

  const commands = {
    help: 'Show available commands',
    about: 'Display information about me',
    skills: 'List my technical skills',
    projects: 'Show my projects',
    experience: 'Display work experience',
    contact: 'Get my contact information',
    certifications: 'Show my certifications',
    resume: 'Download my resume',
    clear: 'Clear the terminal',
    ls: 'List directory contents',
    whoami: 'Display current user',
    date: 'Show current date and time',
    pwd: 'Print working directory',
    echo: 'Display a line of text (usage: echo [text])',
    history: 'Show command history',
    theme: 'Change terminal theme and experience eg: [theme cyberpunk/hacker/ocean/matrix/retro]',
  };

  useEffect(() => {
    const welcome = (
      <div className="mb-6 select-none">
        <div className={`${theme.success} font-bold text-xs sm:text-sm lg:text-base mb-4 overflow-hidden`}>
          {theme.welcomeArt.map((line, index) => (
            <div key={index} className="whitespace-nowrap font-mono">{line}</div>
          ))}
        </div>
        <div className={`${theme.success} mb-2 text-sm sm:text-base`}>
          {portfolioData.personalInfo.title} | {portfolioData.personalInfo.location}
        </div>
        <div className={`${theme.accent} mb-4 text-sm sm:text-base italic`}>
          {theme.personality}
        </div>
        <div className={`${theme.success} mb-4 text-sm sm:text-base`}>
          Type <span className={`${theme.warning} font-bold`}>'help'</span> to see available commands
        </div>
        <div className={`${theme.secondary} text-xs sm:text-sm mb-4`}>
          💡 Tips: Use ↑/↓ arrows for command history, Tab for autocomplete, Ctrl+L to clear
        </div>
      </div>
    );
    setOutput([welcome]);
  }, [currentTheme]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        handleClear();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClear = () => {
    setOutput([]);
    setCurrentCommand('');
  };

  const downloadResume = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // User should place their resume.pdf in the public folder
    link.download = `${portfolioData.personalInfo.name.replace(' ', '_')}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const [command, ...args] = trimmedCmd.toLowerCase().split(' ');
    let newOutput: JSX.Element;

    const commandLine = (
      <div className={`flex items-start ${theme.prompt} mb-2 flex-wrap`}>
        <div className="flex items-center flex-shrink-0">
          <span className={`${theme.accent} font-bold`}>{theme.username}@{theme.hostname}</span>
          <span className="text-white">:</span>
          <span className={`${theme.link}`}>{currentPath}</span>
          <span className="text-white">{theme.commandPrefix} </span>
        </div>
        <span className={`${theme.success} break-all`}>{trimmedCmd}</span>
      </div>
    );

    switch (command) {
      case 'help':
        newOutput = (
          <div className={`${theme.success} mb-6`}>
            <div className={`${theme.warning} font-bold mb-3 text-sm sm:text-base`}>Available Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm mb-4">
              {Object.entries(commands).map(([cmd, desc]) => (
                <div key={cmd} className="flex flex-col sm:flex-row mb-1">
                  <span className={`${theme.accent} font-mono w-full sm:w-24 flex-shrink-0`}>{cmd}</span>
                  <span className={`${theme.secondary} sm:ml-2`}>- {desc}</span>
                </div>
              ))}
            </div>
            <div className={`${theme.warning} text-xs sm:text-sm mt-4`}>
              <div className="font-bold mb-2">🎨 Theme System:</div>
              <div className={`${theme.secondary} space-y-1`}>
                <div>• <span className={`${theme.accent} font-mono`}>theme</span> - Show current theme and available options</div>
                <div>• <span className={`${theme.accent} font-mono`}>theme [name]</span> - Switch to a specific theme</div>
                <div className="mt-2">Each theme transforms the entire terminal experience:</div>
                <div className="ml-4 space-y-1">
                  <div>- Unique ASCII art and welcome messages</div>
                  <div>- Different username/hostname combinations</div>
                  <div>- Custom command prompts and personalities</div>
                  <div>- Themed loading messages and icons</div>
                </div>
              </div>
            </div>
          </div>
        );
        break;

      case 'about':
        newOutput = (
          <div className={`${theme.success} mb-6`}>
            <div className={`${theme.warning} font-bold mb-3 text-sm sm:text-base`}>About Me:</div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 gap-4">
              <img 
                src={portfolioData.personalInfo.image} 
                alt={portfolioData.personalInfo.name}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-current flex-shrink-0`}
              />
              <div className="min-w-0">
                <div className={`${theme.accent} font-bold text-sm sm:text-base`}>{portfolioData.personalInfo.name}</div>
                <div className={`${theme.secondary} text-xs sm:text-sm`}>{portfolioData.personalInfo.title}</div>
              </div>
            </div>
            <div className="space-y-3 text-xs sm:text-sm">
              {portfolioData.aboutMe.map((paragraph, index) => (
                <div key={index} className={`${theme.secondary} leading-relaxed`}>{paragraph}</div>
              ))}
            </div>
          </div>
        );
        break;

      case 'skills':
        newOutput = (
          <div className={`${theme.success} mb-6`}>
            <div className={`${theme.warning} font-bold mb-3 text-sm sm:text-base`}>Technical Skills:</div>
            <div className="space-y-3 text-xs sm:text-sm">
              {Object.entries(portfolioData.skills).map(([category, items]) => (
                <div key={category} className="break-words">
                  <span className={`${theme.accent} font-bold capitalize`}>{category}:</span>
                  <div className={`${theme.secondary} ml-2 mt-1`}>{items.join(', ')}</div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'projects':
        newOutput = (
          <div className={`${theme.success} mb-6`}>
            <div className={`${theme.warning} font-bold mb-3 text-sm sm:text-base`}>Projects:</div>
            <div className="space-y-5">
              {portfolioData.projects.map((project) => (
                <div key={project.id} className="border-l-2 border-current pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <span className={`${theme.accent} font-bold text-sm sm:text-base`}>{project.title}</span>
                    <span className={`${theme.secondary} text-xs`}>({project.year})</span>
                  </div>
                  <div className={`${theme.secondary} mb-3 text-xs sm:text-sm leading-relaxed`}>{project.description}</div>
                  <div className={`text-purple-400 mb-3 text-xs sm:text-sm`}>
                    <span className="font-semibold">Technologies:</span> {project.technologies.join(', ')}
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs sm:text-sm">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`${theme.link} hover:opacity-80 flex items-center gap-1 transition-opacity`}
                      >
                        <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'experience':
        newOutput = (
          <div className={`${theme.success} mb-6`}>
            <div className={`${theme.warning} font-bold mb-3 text-sm sm:text-base`}>Work Experience:</div>
            <div className="space-y-5">
              {portfolioData.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-current pl-4">
                  <div className={`${theme.accent} font-bold text-sm sm:text-base`}>{exp.position}</div>
                  <div className={`${theme.secondary} mb-3 text-xs sm:text-sm`}>{exp.company} • {exp.duration}</div>
                  <ul className={`${theme.secondary} mb-3 list-disc list-inside space-y-1 text-xs sm:text-sm`}>
                    {exp.description.map((desc, index) => (
                      <li key={index} className="leading-relaxed">{desc}</li>
                    ))}
                  </ul>
                  <div className={`text-purple-400 text-xs sm:text-sm`}>
                    <span className="font-semibold">Technologies:</span> {exp.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'contact':
        newOutput = (
          <div className={`${theme.success} mb-6`}>
            <div className={`${theme.warning} font-bold mb-3 text-sm sm:text-base`}>Contact Information:</div>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Mail className={`w-4 h-4 ${theme.accent} flex-shrink-0`} />
                <a href={`mailto:${portfolioData.personalInfo.email}`} className={`${theme.link} hover:opacity-80 transition-opacity break-all`}>
                  {portfolioData.personalInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Github className={`w-4 h-4 ${theme.accent} flex-shrink-0`} />
                <a href={portfolioData.personalInfo.github} target="_blank" rel="noopener noreferrer" className={`${theme.link} hover:opacity-80 transition-opacity break-all`}>
                  {portfolioData.personalInfo.github}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className={`w-4 h-4 ${theme.accent} flex-shrink-0`} />
                <a href={portfolioData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className={`${theme.link} hover:opacity-80 transition-opacity break-all`}>
                  {portfolioData.personalInfo.linkedin}
                </a>
              </div>
              
            </div>
          </div>
        );
        break;

      case 'certifications':
        newOutput = (
          <div className={`${theme.success} mb-6`}>
            <div className={`${theme.warning} font-bold mb-3 text-sm sm:text-base`}>Certifications:</div>
            <div className="space-y-4">
              {portfolioData.certifications.map((cert) => (
                <div key={cert.id} className="border-l-2 border-current pl-4">
                  <div className={`${theme.accent} font-bold text-sm sm:text-base mb-1`}>{cert.name}</div>
                  <div className={`${theme.secondary} text-xs sm:text-sm mb-2`}>{cert.issuer} • {cert.date}</div>
                  {cert.credentialUrl && (
                    <a 
                      href={cert.credentialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`${theme.link} hover:opacity-80 flex items-center gap-1 text-xs sm:text-sm transition-opacity`}
                    >
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      View Credential
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'resume':
        newOutput = (
          <div className={`${theme.success} mb-6`}>
            <div className={`${theme.warning} mb-2 text-sm sm:text-base flex items-center gap-2`}>
              <Download className="w-4 h-4" />
              Resume Download
            </div>
            <div className={`${theme.secondary} text-xs sm:text-sm space-y-2`}>
              <div>{theme.loadingText}</div>
              <div className={`${theme.success}`}>{theme.successIcon} Resume download started!</div>
              <div className={`${theme.secondary} mt-2 text-xs`}>
                Note: Make sure to place your resume.pdf file in the public folder
              </div>
            </div>
          </div>
        );
        downloadResume();
        break;

      case 'clear':
        setOutput([]);
        return;

      case 'ls':
        newOutput = (
          <div className={`${theme.success} mb-6`}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
              <div className={`${theme.accent}`}>about.txt</div>
              <div className={`${theme.accent}`}>skills.txt</div>
              <div className={`${theme.link}`}>projects/</div>
              <div className={`${theme.link}`}>experience/</div>
              <div className={`${theme.accent}`}>contact.txt</div>
              <div className={`${theme.link}`}>certifications/</div>
            </div>
          </div>
        );
        break;

      case 'whoami':
        newOutput = (
          <div className={`${theme.success} mb-6`}>
            <div className={`${theme.accent} text-sm sm:text-base`}>{theme.username}</div>
          </div>
        );
        break;

      case 'date':
        newOutput = (
          <div className={`${theme.success} mb-6`}>
            <div className={`${theme.accent} text-sm sm:text-base`}>{new Date().toString()}</div>
          </div>
        );
        break;

      case 'pwd':
        newOutput = (
          <div className={`${theme.success} mb-6`}>
            <div className={`${theme.accent} text-sm sm:text-base`}>/home/{theme.username}</div>
          </div>
        );
        break;

      case 'echo':
        const echoText = args.join(' ') || '';
        newOutput = (
          <div className={`${theme.success} mb-6`}>
            <div className={`${theme.secondary} text-sm sm:text-base break-words`}>{echoText}</div>
          </div>
        );
        break;

      case 'history':
        newOutput = (
          <div className={`${theme.success} mb-6`}>
            <div className={`${theme.warning} font-bold mb-2 text-sm sm:text-base`}>Command History:</div>
            <div className="space-y-1 text-xs sm:text-sm">
              {commandHistory.map((cmd, index) => (
                <div key={index} className={`${theme.secondary}`}>
                  <span className={`${theme.accent} mr-2`}>{index + 1}</span>
                  <span className="break-all">{cmd}</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'theme':
        if (args.length === 0) {
          newOutput = (
            <div className={`${theme.success} mb-6`}>
              <div className={`${theme.warning} mb-2 text-sm sm:text-base`}>🎨 Terminal Theme System</div>
              <div className={`${theme.secondary} text-xs sm:text-sm space-y-2`}>
                <div className="mb-3">Current theme: <span className={`${theme.accent} font-bold`}>{theme.name}</span></div>
                <div className="mb-2 font-semibold">Available themes:</div>
                {Object.entries(themes).map(([key, themeData]) => (
                  <div key={key} className="flex items-start gap-2 mb-2">
                    <span className={`${theme.accent} font-mono w-12 flex-shrink-0`}>{key}</span>
                    <div>
                      <div className="font-semibold">{themeData.name}</div>
                      <div className="text-xs opacity-80">{themeData.personality}</div>
                    </div>
                  </div>
                ))}
                <div className="mt-3 text-xs">
                  <div className="font-semibold mb-1">Usage:</div>
                  <div>• <span className={`${theme.accent} font-mono`}>theme cyberpunk</span> - Enter Night City</div>
                  <div>• <span className={`${theme.accent} font-mono`}>theme hacker</span> - Join the underground</div>
                  <div>• <span className={`${theme.accent} font-mono`}>theme ocean</span> - Dive deep</div>
                </div>
              </div>
            </div>
          );
        } else {
          const newTheme = args[0];
          if (themes[newTheme]) {
            setCurrentTheme(newTheme);
            newOutput = (
              <div className={`${theme.success} mb-6`}>
                <div className={`${theme.success} text-sm sm:text-base space-y-1`}>
                  <div>{theme.successIcon} Theme transformation initiated...</div>
                  <div>{theme.loadingText}</div>
                  <div>{theme.successIcon} Welcome to {themes[newTheme].name}!</div>
                  <div className={`${theme.accent} italic mt-2`}>{themes[newTheme].personality}</div>
                </div>
              </div>
            );
          } else {
            newOutput = (
              <div className={`${theme.error} mb-6`}>
                <div className="text-sm sm:text-base">
                  {theme.errorIcon} Theme '{newTheme}' not found. Available themes: {Object.keys(themes).join(', ')}
                </div>
              </div>
            );
          }
        }
        break;

      case portfolioData.easterEgg.command:
        newOutput = (
          <div className={`${theme.success} mb-6`}>
            <div className="space-y-1 text-xs sm:text-sm">
              {portfolioData.easterEgg.response.map((line, index) => (
                <div key={index} className="text-purple-400 break-words">{line}</div>
              ))}
            </div>
          </div>
        );
        break;

      default:
        newOutput = (
          <div className={`${theme.error} mb-6`}>
            <div className="text-sm sm:text-base break-words">
              {theme.errorIcon} Command not found: {command}. Type 'help' for available commands.
            </div>
          </div>
        );
    }

    setOutput(prev => [...prev, commandLine, newOutput]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCommand.trim()) {
      executeCommand(currentCommand);
      setCommandHistory(prev => [...prev, currentCommand]);
      setHistoryIndex(-1);
      setCurrentCommand('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentCommand('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter(cmd => cmd.startsWith(currentCommand.toLowerCase()));
      if (matches.length === 1) {
        setCurrentCommand(matches[0]);
      }
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} font-mono flex flex-col`}>
      {/* Terminal Content */}
      <div 
        className="flex-1 p-4 overflow-hidden cursor-text"
        onClick={handleTerminalClick}
      >
        <div 
          ref={outputRef}
          className="h-full overflow-y-auto pb-20 scrollbar-thin scrollbar-thumb-current scrollbar-track-gray-800"
        >
          {output.map((item, index) => (
            <div key={index}>
              {item}
            </div>
          ))}
          
          <form onSubmit={handleSubmit} className="flex items-start flex-wrap">
            <div className="flex items-center flex-shrink-0">
              <span className={`${theme.accent} font-bold text-sm sm:text-base`}>{theme.username}@{theme.hostname}</span>
              <span className="text-white">:</span>
              <span className={`${theme.link}`}>{currentPath}</span>
              <span className="text-white">{theme.commandPrefix} </span>
            </div>
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`bg-transparent outline-none ${theme.success} flex-1 min-w-0 ml-1 text-sm sm:text-base`}
              autoFocus
              spellCheck={false}
            />
            <ChevronRight className={`w-4 h-4 ${theme.text} animate-pulse flex-shrink-0 ml-1`} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Terminal;