'use client';

import * as React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle2, ShieldAlert, ShieldCheck } from 'lucide-react';

interface StrengthIndicatorProps {
  score: number | null;
  analysis?: string | null;
  isLoading?: boolean;
}

export function StrengthIndicator({ score, analysis, isLoading }: StrengthIndicatorProps) {
  if (isLoading) {
    return (
      <div className="mt-4 space-y-2">
        <p className="text-sm text-muted-foreground text-center">Analyzing password strength...</p>
        <Progress value={50} className="h-2 animate-pulse [&>div]:bg-primary" />
      </div>
    );
  }

  if (score === null) {
    return null;
  }

  const strengthValue = Math.round(score * 100);
  let strengthText = 'Weak';
  let strengthColorClass = 'bg-destructive'; 
  let textColorClass = 'text-destructive';
  let IconComponent = AlertTriangle;

  if (score >= 0.8) {
    strengthText = 'Very Strong';
    strengthColorClass = 'bg-accent'; 
    textColorClass = 'text-accent';
    IconComponent = ShieldCheck;
  } else if (score >= 0.6) {
    strengthText = 'Strong';
    strengthColorClass = 'bg-green-500'; // Using a distinct green for "Strong"
    textColorClass = 'text-green-500';
    IconComponent = CheckCircle2;
  } else if (score >= 0.3) {
    strengthText = 'Moderate';
    strengthColorClass = 'bg-chart-4'; // Using theme's chart-4 for yellow
    textColorClass = 'text-chart-4';
    IconComponent = ShieldAlert;
  }


  return (
    <div className="mt-6 space-y-3 p-4 border rounded-lg bg-card/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconComponent className={cn("h-5 w-5", textColorClass)} />
          <p className="text-sm font-medium">
            Password Strength: <span className={cn(textColorClass)}>{strengthText}</span>
          </p>
        </div>
        <span className="text-sm font-mono">{strengthValue}%</span>
      </div>
      <Progress value={strengthValue} className="h-3 rounded-full" indicatorClassName={strengthColorClass} />
      {analysis && (
        <div className="mt-3 pt-3 border-t">
          <h4 className="text-sm font-semibold mb-1">Strength Analysis:</h4>
          <p className="text-xs text-muted-foreground whitespace-pre-wrap">{analysis}</p>
        </div>
      )}
    </div>
  );
}
