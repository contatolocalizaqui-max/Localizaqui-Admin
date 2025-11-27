
import React from 'react';

interface StepperProps {
    currentStep: number;
    totalSteps: number;
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, totalSteps }) => {
    return (
        <div className="flex items-center w-full max-w-xs mx-auto mb-8">
            {Array.from({ length: totalSteps }).map((_, index) => {
                const stepNumber = index + 1;
                const isCompleted = stepNumber < currentStep;
                const isActive = stepNumber === currentStep;

                return (
                    <React.Fragment key={stepNumber}>
                        <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                                isCompleted ? 'bg-[#20FF82] text-black' : 
                                isActive ? 'border-2 border-[#20FF82] text-[#20FF82]' : 
                                'bg-[#2a2a2a] text-gray-500'
                            }`}>
                                {isCompleted ? '✓' : stepNumber}
                            </div>
                        </div>
                        {stepNumber < totalSteps && (
                            <div className={`flex-auto border-t-2 transition-colors duration-500 ease-in-out ${
                                isCompleted ? 'border-[#20FF82]' : 'border-gray-700'
                            }`}></div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};
