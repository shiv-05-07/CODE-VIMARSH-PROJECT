import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X } from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'input' | 'output';
  content: string;
}

const TERMINAL_RESPONSES: Record<string, string> = {
  help: `Available commands:
  • help     - Show this help message
  • about    - Learn about Code Vimarsh
  • whois    - Who are we?
  • clear    - Clear terminal
  • echo     - Echo a message`,
  about: `Code Vimarsh is a community of architects, not just coders.
We believe in intellectual deliberation, deep discourse, and
collaborative refinement. Our mission is to elevate software
development through thoughtful, deliberate practices.

Vimarsh: The art of intellectual deliberation.`,
  whois: `We are a collective of developers, architects, and thinkers
who value quality over speed, discourse over haste, and
excellence over mediocrity.

Founded on principles of:
• Deep Deliberation
• Collaborative Discourse
• Architectural Excellence
• Sustainable Code

Join us in shaping the future of software development.`,
  clear: '',
};

export default function VimarshTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: '0',
      type: 'output',
      content: 'Welcome to Code Vimarsh Terminal v1.0.0',
    },
    {
      id: '1',
      type: 'output',
      content: 'Type "help" to get started.',
    },
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleCommand = (command: string) => {
    const trimmedCommand = command.trim().toLowerCase();

    // Add input line
    const inputId = Date.now().toString();
    setLines((prev) => [
      ...prev,
      {
        id: inputId,
        type: 'input',
        content: command,
      },
    ]);

    // Handle clear command
    if (trimmedCommand === 'clear') {
      setLines([]);
      setInput('');
      return;
    }

    // Get response
    const response = TERMINAL_RESPONSES[trimmedCommand] || `Command not found: ${command}. Type "help" for available commands.`;

    // Add output line
    const outputId = (Date.now() + 1).toString();
    setLines((prev) => [
      ...prev,
      {
        id: outputId,
        type: 'output',
        content: response,
      },
    ]);

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (input.trim()) {
        handleCommand(input);
      }
    }
  };

  return (
    <>
      {/* Floating Terminal Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-neon-cyan text-charcoal flex items-center justify-center hover:shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300 group"
        aria-label="Open Vimarsh Terminal"
      >
        <TerminalIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </motion.button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-8 z-50 w-full max-w-md bg-charcoal border border-neon-cyan/30 rounded-xl shadow-2xl shadow-neon-cyan/20 overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-white/5 border-b border-neon-cyan/20 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs font-mono text-white/60">vimarsh@terminal</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Close terminal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Terminal Content */}
            <div className="h-80 overflow-y-auto bg-charcoal/50 p-4 space-y-2 font-mono text-sm">
              <AnimatePresence mode="popLayout">
                {lines.map((line, index) => (
                  <motion.div
                    key={line.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`whitespace-pre-wrap break-words ${
                      line.type === 'input'
                        ? 'text-neon-cyan'
                        : 'text-white/70'
                    }`}
                  >
                    {line.type === 'input' ? '$ ' : ''}
                    {line.content}
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={terminalEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-neon-cyan/20 bg-white/5 px-4 py-3 flex items-center gap-2">
              <span className="text-neon-cyan font-mono text-sm">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type command..."
                className="flex-1 bg-transparent text-white font-mono text-sm outline-none placeholder:text-white/30"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
