'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, RefreshCw, Lock, KeyRound, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { analyzePasswordStrength, AnalyzePasswordStrengthOutput } from '@/ai/flows/analyze-password-strength';
import { StrengthIndicator } from './strength-indicator';
import { Separator } from './ui/separator';

const charSets = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?/~',
};

export function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [strengthResult, setStrengthResult] = useState<AnalyzePasswordStrengthOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);

  const { toast } = useToast();

  const generatePassword = useCallback(() => {
    let charset = '';
    if (includeUppercase) charset += charSets.uppercase;
    if (includeLowercase) charset += charSets.lowercase;
    if (includeNumbers) charset += charSets.numbers;
    if (includeSymbols) charset += charSets.symbols;

    if (charset === '') {
      toast({
        title: 'Error',
        description: 'Please select at least one character set.',
        variant: 'destructive',
      });
      setPassword('');
      setStrengthResult(null);
      return;
    }

    let newPassword = '';
    // Ensure at least one character from each selected set if possible and length allows
    const selectedSets: string[] = [];
    if (includeUppercase) selectedSets.push(charSets.uppercase);
    if (includeLowercase) selectedSets.push(charSets.lowercase);
    if (includeNumbers) selectedSets.push(charSets.numbers);
    if (includeSymbols) selectedSets.push(charSets.symbols);

    for (const set of selectedSets) {
      if (newPassword.length < passwordLength) {
        newPassword += set[Math.floor(Math.random() * set.length)];
      }
    }
    
    for (let i = newPassword.length; i < passwordLength; i++) {
      newPassword += charset[Math.floor(Math.random() * charset.length)];
    }

    // Shuffle the password to ensure randomness of prefixed characters
    newPassword = newPassword.split('').sort(() => 0.5 - Math.random()).join('');
    
    setPassword(newPassword);
    setStrengthResult(null); // Reset strength on new password
  }, [passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols, toast]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleAnalyzeStrength = async () => {
    if (!password) {
      toast({ title: 'No Password', description: 'Generate a password first to analyze its strength.', variant: 'destructive' });
      return;
    }
    setIsAnalyzing(true);
    setStrengthResult(null);
    try {
      const result = await analyzePasswordStrength({ password });
      setStrengthResult(result);
    } catch (error) {
      console.error('Error analyzing password strength:', error);
      toast({
        title: 'Analysis Error',
        description: 'Could not analyze password strength. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      toast({
        title: 'Copied!',
        description: 'Password copied to clipboard.',
      });
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy password: ', err);
      toast({
        title: 'Copy Failed',
        description: 'Could not copy password to clipboard.',
        variant: 'destructive',
      });
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl bg-card/80 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <KeyRound className="h-10 w-10 text-primary" />
          <CardTitle className="text-4xl font-bold tracking-tight">PassForge</CardTitle>
        </div>
        <CardDescription className="text-lg">
          Generate strong, secure passwords tailored to your needs.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-6 md:p-8">
        <div className="relative">
          <Input
            id="password"
            type="text"
            value={password}
            readOnly
            className="h-14 pr-24 text-2xl font-mono tracking-wider bg-input text-foreground placeholder:text-muted-foreground"
            placeholder="Your Secure Password"
            aria-label="Generated Password"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopyToClipboard}
            className="absolute right-12 top-1/2 -translate-y-1/2 h-10 w-10 text-muted-foreground hover:text-primary"
            aria-label="Copy password"
          >
            {copied ? <Check className="h-6 w-6 text-accent" /> : <Copy className="h-6 w-6" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={generatePassword}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 text-muted-foreground hover:text-primary"
            aria-label="Regenerate password"
          >
            <RefreshCw className="h-6 w-6" />
          </Button>
        </div>

        <Separator />

        <div className="space-y-6">
          <div>
            <Label htmlFor="length" className="block mb-2 text-base font-medium">Password Length: {passwordLength}</Label>
            <Slider
              id="length"
              min={8}
              max={64}
              step={1}
              value={[passwordLength]}
              onValueChange={(value) => setPasswordLength(value[0])}
              className="[&>span>span]:bg-primary"
              aria-label={`Password length ${passwordLength}`}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Uppercase (A-Z)', state: includeUppercase, setState: setIncludeUppercase, id: 'uppercase' },
              { label: 'Lowercase (a-z)', state: includeLowercase, setState: setIncludeLowercase, id: 'lowercase' },
              { label: 'Numbers (0-9)', state: includeNumbers, setState: setIncludeNumbers, id: 'numbers' },
              { label: 'Symbols (!@#)', state: includeSymbols, setState: setIncludeSymbols, id: 'symbols' },
            ].map(opt => (
              <div key={opt.id} className="flex items-center space-x-2 p-3 bg-background rounded-md border">
                <Checkbox
                  id={opt.id}
                  checked={opt.state}
                  onCheckedChange={(checked) => opt.setState(Boolean(checked))}
                  className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  aria-label={`Include ${opt.label}`}
                />
                <Label htmlFor={opt.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                  {opt.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />

        <Button
          onClick={handleAnalyzeStrength}
          disabled={isAnalyzing || !password}
          className="w-full h-12 text-lg bg-primary hover:bg-primary/90"
          aria-label="Check password strength"
        >
          <Lock className="mr-2 h-5 w-5" />
          {isAnalyzing ? 'Analyzing...' : 'Check Password Strength'}
        </Button>

        <StrengthIndicator score={strengthResult?.strengthScore ?? null} analysis={strengthResult?.analysis} isLoading={isAnalyzing} />
      </CardContent>
    </Card>
  );
}
