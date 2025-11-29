import React from 'react';

const IconMail: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>);
const IconGithub: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>);
const IconFileText: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>);

const ContactInfoSection: React.FC = () => {
    return (
        <section id="contact" className="py-16 md:py-24 bg-white border-t border-slate-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">Let's Connect</h2>
                        <p className="text-base md:text-lg text-slate-600">
                            커피 한 잔 하며 개발 이야기를 나눠요. <br className="hidden md:block"/>
                            언제든 환영합니다.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3 md:gap-4 w-full md:w-auto">
                        <a href="mailto:contact@comfunny.com" className="flex-1 md:flex-none flex items-center justify-center px-6 py-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm hover:shadow-md group">
                            <IconMail className="w-5 h-5 mr-3 text-slate-400 group-hover:text-blue-600" />
                            <span className="font-medium">Email</span>
                        </a>
                         <a href="https://github.com" target="_blank" rel="noreferrer" className="flex-1 md:flex-none flex items-center justify-center px-6 py-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-md hover:shadow-lg">
                            <IconGithub className="w-5 h-5 mr-3" />
                            <span className="font-medium">GitHub</span>
                        </a>
                    </div>
                 </div>
            </div>
        </section>
    );
};

export default ContactInfoSection;