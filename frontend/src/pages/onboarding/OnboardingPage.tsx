

import React, {useEffect, useRef, useState} from 'react';
import {gsap} from 'gsap';
import {ScrollToPlugin} from 'gsap/ScrollToPlugin';
import {useAuthStore} from "@/store/authStore.ts";

gsap.registerPlugin(ScrollToPlugin);

interface Question {
    id: string;
    title: string;
    options: string[];
    isSubQuestion?: boolean;
    subQuestionTitle?: string;
}

const questions: Question[] = [{
    id: 'role',
    title: 'How would you best describe your role?',
    options: ['Full-time developer, engineer, or architect', 'Freelance developer or engineer', 'Product manager or product owner', 'Founder, C-level executive, or business owner', 'Designer', 'Sales or marketing', 'Not currently working', 'Student', 'Other']
}, {
    id: 'student-type',
    title: 'How would you best describe your role?',
    options: ['a high school student', 'working on my bachelor\'s degree', 'working on my master\'s degree', 'working on my PhD'],
    isSubQuestion: true,
    subQuestionTitle: 'You are currently...'
}, {
    id: 'purpose',
    title: 'What will you use Codementor for?',
    options: ['Work', 'Personal project or learning', 'Both work and personal use']
}];

const CodementorOnboarding: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
    const [showStudentSubQuestion, setShowStudentSubQuestion] = useState(false);
    const [showCompletion, setShowCompletion] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<HTMLDivElement[]>([]);
    const accessToken = useAuthStore(state => state.accessToken)

    useEffect(() => {
        // Initial animation for the first screen
        if (currentStep === 0) {
            gsap.fromTo('.welcome-content', {opacity: 0, y: 50}, {opacity: 1, y: 0, duration: 0.8, ease: 'power2.out'});
            gsap.fromTo('.illustration', {opacity: 0, scale: 0.8}, {
                opacity: 1,
                scale: 1,
                duration: 1,
                delay: 0.3,
                ease: 'power2.out'
            });
        }
    }, [currentStep]);

    const handleOptionSelect = (questionId: string, option: string) => {
        setSelectedAnswers(prev => ({...prev, [questionId]: option}));

        if (questionId === 'role' && option === 'Student') {
            setTimeout(() => {
                setShowStudentSubQuestion(true);
                setCurrentStep(2);
                scrollToStep(2);
            }, 300);
        } else if (questionId === 'role' && option !== 'Student') {
            setShowStudentSubQuestion(true);
            setTimeout(() => {
                setCurrentStep(3);
                scrollToStep(3);
            }, 800);
        } else if (questionId === 'student-type') {
            setTimeout(() => {
                setCurrentStep(3);
                scrollToStep(3);
            }, 800);
        } else if (questionId === 'purpose') {
            // Don't auto-advance, wait for complete button
            return;
        }
    };

    const handleComplete = async () => {
        setShowCompletion(true);
        const onboardingData = prepareOnboardingData();
        console.log("Onboarding: ", onboardingData)

        // try {
        //     const response = await fetch('/api/onboarding/complete', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${accessToken}`
        //         },
        //         body: JSON.stringify(onboardingData)
        //     });
        //     if (response.ok) {
        //         console.log('Onboarding data submitted successfully');
        //     } else {
        //         console.error('Failed to submit onboarding data');
        //     }
        // }catch (e){
        //     console.error('Error submitting onboarding data');
        // }
        setTimeout(() => {
            setCurrentStep(4);
            scrollToStep(4);
        }, 500);
    };

    const goToNextStep = () => {
        setCurrentStep(1);
        scrollToStep(1);
    };

    const goToPreviousStep = () => {
        if (currentStep === 3 && showStudentSubQuestion) {
            setCurrentStep(2);
            scrollToStep(2);
        } else if (currentStep === 3 && !showStudentSubQuestion) {
            setCurrentStep(1);
            scrollToStep(1);
        } else if (currentStep === 2) {
            setCurrentStep(1);
            scrollToStep(1);
            setShowStudentSubQuestion(false);
        }
    };

    const scrollToStep = (step: number) => {
        const targetElement = stepsRef.current[step];
        if (targetElement) {
            gsap.to(window, {
                duration: 1, scrollTo: {y: targetElement, offsetY: 50}, ease: 'power2.inOut'
            });

            // Animate in the new content
            setTimeout(() => {
                gsap.fromTo(targetElement.querySelectorAll('.animate-in'), {opacity: 0, y: 30}, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power2.out'
                });
            }, 500);
        }
    };

    const prepareOnboardingData = () => {
        return {
            designation: selectedAnswers.role || null,
            studentType: selectedAnswers["student-type"] || null,
            purpose: selectedAnswers.purpose || null
        };
    };

    // const completeOnboarding = async()=>{
    //     const onboardingData = prepareOnboardingData();
    //     // try {
    //     //     const response = await fetch('/api/onboarding/complete', {
    //     //         method: 'POST',
    //     //         headers: {
    //     //             'Content-Type': 'application/json'
    //     //         },
    //     //         body: JSON.stringify(onboardingData)
    //     //     });
    //     //     if (response.ok) {
    //     //         console.log('Onboarding data submitted successfully');
    //     //     } else {
    //     //         console.error('Failed to submit onboarding data');
    //     //     }
    //     // }catch (){
    //     //     console.error('Error submitting onboarding data');
    //     // }
    // }

    const renderWelcomeScreen = () => (<div className="min-h-screen flex items-center justify-center px-4 py-8">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="welcome-content space-y-6">
                    <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
                        Hi, Jony<br/>
                        Welcome to Codementor!
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                        You're almost ready to connect with our community of 12,000+
                        vetted developers. To find the best mentors for you, let us know a
                        little about you. This will only take a minute.
                    </p>
                    <button
                        onClick={goToNextStep}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105"
                    >
                        GET STARTED
                    </button>
                </div>

                <div className="illustration relative">
                    <div className="relative bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 lg:p-12">
                        {/* Code Editor Mockup */}
                        <div className="bg-slate-800 rounded-lg p-4 mb-6 shadow-lg">
                            <div className="flex space-x-2 mb-3">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 bg-cyan-400 rounded w-3/4"></div>
                                <div className="h-2 bg-blue-400 rounded w-1/2"></div>
                                <div className="h-2 bg-green-400 rounded w-5/6"></div>
                                <div className="h-2 bg-purple-400 rounded w-2/3"></div>
                                <div className="h-2 bg-pink-400 rounded w-1/3"></div>
                                <div className="h-2 bg-cyan-400 rounded w-4/5"></div>
                            </div>
                        </div>

                        {/* Laptop */}
                        <div className="bg-slate-700 rounded-t-xl p-2">
                            <div className="bg-blue-100 rounded-lg h-32 relative overflow-hidden">
                                <div
                                    className="absolute inset-2 bg-white rounded shadow-sm flex items-center justify-center">
                                    <div className="w-12 h-12 bg-cyan-400 rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                        <div className="h-4 bg-slate-600 rounded-b-xl"></div>

                        {/* People illustrations */}
                        <div
                            className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center">
                            <span className="text-sm">💡</span>
                        </div>

                        {/* Floating elements */}
                        <div className="absolute bottom-8 -left-4 space-y-2">
                            <div
                                className="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-white font-bold">J
                            </div>
                            <div
                                className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-white font-bold">A
                            </div>
                        </div>

                        {/* Sticky note */}
                        <div className="absolute top-4 right-8 bg-yellow-200 p-2 rounded rotate-12 shadow-md">
                            <p className="text-xs font-medium">Work Hard</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>);

    const renderQuestionScreen = (question: Question, questionNumber: number, showPrevious: boolean = true) => (
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="space-y-6">
                    {showPrevious && (<button
                            onClick={goToPreviousStep}
                            className="animate-in flex items-center text-slate-600 hover:text-slate-800 mb-4 transition-colors"
                        >
                            <span className="mr-2">↑</span> Previous
                        </button>)}

                    <div className="animate-in">
                        <p className="text-slate-600 mb-2">Question {questionNumber + 1} out of 3</p>
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-8">
                            {question.title}
                        </h2>
                    </div>

                    {question.isSubQuestion && (<div className="animate-in mb-4">
                            <p className="text-lg font-medium text-slate-700 mb-4">
                                {selectedAnswers.role}
                            </p>
                            <p className="text-slate-600 mb-6">{question.subQuestionTitle}</p>
                        </div>)}

                    <div className="space-y-3">
                        {question.options.map((option, index) => (<button
                                key={index}
                                onClick={() => handleOptionSelect(question.id, option)}
                                className={`animate-in w-full text-left p-4 rounded-lg border-2 transition-all duration-200 hover:border-cyan-400 hover:bg-cyan-50 ${selectedAnswers[question.id] === option ? 'border-cyan-400 bg-cyan-50' : 'border-slate-200 bg-white'}`}
                                style={{animationDelay: `${index * 0.1}s`}}
                            >
                                <span className="font-medium text-slate-800">{option}</span>
                            </button>))}
                    </div>

                    {/* Complete button for purpose question */}
                    {question.id === 'purpose' && selectedAnswers.purpose && (<div className="animate-in mt-8">
                            <button
                                onClick={handleComplete}
                                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105"
                            >
                                COMPLETE
                            </button>
                        </div>)}
                </div>

                {/* Right side illustration */}
                <div className="illustration relative">
                    <div className="relative bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 lg:p-12">
                        {/* Code Editor */}
                        <div className="bg-slate-800 rounded-lg p-4 mb-6 shadow-lg relative">
                            <div className="flex space-x-2 mb-3">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 bg-cyan-400 rounded w-3/4"></div>
                                <div className="h-2 bg-blue-400 rounded w-1/2"></div>
                                <div className="h-2 bg-green-400 rounded w-5/6"></div>
                                <div className="h-2 bg-purple-400 rounded w-2/3"></div>
                            </div>

                            {question.id === 'purpose' && (<div
                                    className="absolute -top-2 -right-2 w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-white text-sm">
                                    💬
                                </div>)}
                        </div>

                        {/* Laptop base */}
                        <div className="bg-slate-700 rounded-t-xl p-2">
                            <div className="bg-blue-100 rounded-lg h-32 relative overflow-hidden">
                                <div className="absolute inset-2 bg-white rounded shadow-sm p-2">
                                    <div className="space-y-1">
                                        <div className="h-2 bg-slate-200 rounded w-full"></div>
                                        <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                                        <div className="h-2 bg-slate-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-4 bg-slate-600 rounded-b-xl"></div>

                        {/* Person sitting on laptop */}
                        <div
                            className="absolute -bottom-4 -right-8 w-16 h-16 bg-cyan-400 rounded-full flex items-center justify-center">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                👨‍💻
                            </div>
                        </div>

                        {/* Person on top of screen for purpose question */}
                        {question.id === 'purpose' && (<div
                                className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center">
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs">
                                    👤
                                </div>
                            </div>)}

                        {question.id === 'student-type' && (
                            <div className="absolute top-4 -right-4 bg-yellow-200 p-2 rounded rotate-12 shadow-md">
                                <p className="text-xs font-medium">Work Hard</p>
                            </div>)}
                    </div>
                </div>
            </div>
        </div>);

    const renderCompletionMessage = () => (<div className="min-h-screen flex items-center justify-center px-4 py-8">
            <div className="max-w-4xl mx-auto text-center">
                <div className="completion-message space-y-6">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                        <span className="text-4xl text-white">✓</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
                        Welcome to Codementor!
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Thank you for completing the onboarding. We're now connecting you with our community of 12,000+
                        vetted developers to find the perfect mentors for your needs.
                    </p>
                    <div className="mt-8">
                        <div className="inline-flex items-center space-x-2 bg-cyan-100 px-4 py-2 rounded-full">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                            <span className="text-cyan-700 font-medium">Finding your mentors...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>);



    return (<div ref={containerRef} className="bg-gray-50 min-h-screen">
            {/* Welcome Screen */}
            {/* @ts-expect-error : reference */}
            <div ref={el => stepsRef.current[0] = el!}>
                {renderWelcomeScreen()}
            </div>

            {/* Question 1: Role */}
            {/* @ts-expect-error : reference */}
            {currentStep >= 1 && (<div ref={el => stepsRef.current[1] = el!}>
                    {renderQuestionScreen(questions[0], 0, false)}
                </div>)}

            {/* Sub-question for Student */}
            {/* @ts-expect-error : reference */}
            {showStudentSubQuestion && currentStep >= 2 && (
                <div ref={el => stepsRef.current[2] = el!} className="sub-question">
                    {renderQuestionScreen(questions[1], 1, true)}
                </div>)}

            {/* Question 2: Purpose */}
            {/* @ts-expect-error : reference */}
            {currentStep >= 3 && (<div ref={el => stepsRef.current[3] = el!}>
                    {renderQuestionScreen(questions[2], showStudentSubQuestion ? 2 : 2, true)}
                </div>)}

            {/* Completion Screen */}
            {/* @ts-expect-error : reference */}
            {showCompletion && (<div ref={el => stepsRef.current[4] = el!}>
                    {renderCompletionMessage()}
                </div>)}
        </div>);
};

export default CodementorOnboarding;