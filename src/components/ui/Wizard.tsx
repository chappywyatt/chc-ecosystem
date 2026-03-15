"use client";

import { useState, type ReactNode } from "react";
import { Button } from "./Button";

interface WizardStep {
  title: string;
  description?: string;
  content: ReactNode;
  validate?: () => boolean;
}

interface WizardProps {
  steps: WizardStep[];
  onComplete: () => void;
  onCancel?: () => void;
  completeLabel?: string;
  loading?: boolean;
}

function Wizard({
  steps,
  onComplete,
  onCancel,
  completeLabel = "Submit",
  loading = false,
}: WizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  const handleNext = () => {
    if (step.validate && !step.validate()) return;
    if (isLast) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (!isFirst) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="flex flex-col">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-medium text-navy">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-text-tertiary">{step.title}</span>
        </div>
        <div className="flex gap-1.5">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 flex-1 rounded-full transition-colors ${
                idx <= currentStep ? "bg-fluent" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-navy">{step.title}</h2>
        {step.description && (
          <p className="mt-1 text-sm text-text-secondary">{step.description}</p>
        )}
      </div>

      {/* Step content */}
      <div className="mb-8 min-h-[200px]">{step.content}</div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between border-t border-border pt-4">
        <div>
          {onCancel && isFirst && (
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          )}
          {!isFirst && (
            <Button variant="secondary" onClick={handleBack}>
              ← Back
            </Button>
          )}
        </div>
        <Button onClick={handleNext} loading={loading}>
          {isLast ? completeLabel : "Next →"}
        </Button>
      </div>
    </div>
  );
}

export { Wizard, type WizardStep };
