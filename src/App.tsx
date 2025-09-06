import React, { useState } from 'react';
import { Upload, FileText, Target, CheckCircle, AlertTriangle, Save, Send, Edit3, Sparkles } from 'lucide-react';

interface JobData {
  title: string;
  company: string;
  description: string;
  keywords: string[];
  requirements: string[];
}

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  matchScore: number;
  status: 'draft' | 'applied';
  createdAt: Date;
}

function App() {
  const [activeTab, setActiveTab] = useState<'coach' | 'dashboard'>('coach');
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [matchScore, setMatchScore] = useState(0);
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp',
      matchScore: 85,
      status: 'applied',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      jobTitle: 'React Developer',
      company: 'StartupX',
      matchScore: 78,
      status: 'draft',
      createdAt: new Date('2024-01-18')
    }
  ]);

  const sampleJobDescription = `We are seeking a Senior Frontend Developer to join our innovative team. 

Key Responsibilities:
- Develop and maintain modern web applications using React and TypeScript
- Collaborate with UX/UI designers to implement responsive designs
- Optimize applications for performance and scalability
- Mentor junior developers and conduct code reviews
- Work with REST APIs and GraphQL

Required Skills:
- 5+ years of experience in frontend development
- Expert knowledge of React, JavaScript, and TypeScript
- Experience with modern build tools (Webpack, Vite)
- Proficiency in CSS frameworks (Tailwind CSS, Material-UI)
- Knowledge of testing frameworks (Jest, React Testing Library)
- Experience with Git and agile development methodologies
- Strong problem-solving and communication skills

Preferred:
- Experience with Next.js and server-side rendering
- Knowledge of Node.js and backend technologies
- Experience with cloud platforms (AWS, Azure)
- Understanding of CI/CD pipelines`;

  const handleJobParsing = () => {
    const parsedJob: JobData = {
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      description: sampleJobDescription,
      keywords: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Git', 'REST APIs', 'GraphQL', 'Tailwind CSS', 'Jest', 'Webpack', 'Vite'],
      requirements: [
        '5+ years frontend development',
        'React expertise',
        'TypeScript proficiency',
        'Modern build tools',
        'Testing frameworks',
        'Agile methodologies'
      ]
    };
    setJobData(parsedJob);
    setMatchScore(82);
  };

  const handleResumeUpload = () => {
    setResumeUploaded(true);
  };

  const highlightedSkills = ['React', 'TypeScript', 'JavaScript', 'CSS', 'Git', 'REST APIs'];
  const missingSkills = ['GraphQL', 'Jest', 'Next.js'];
  const skillsToHighlight = ['Problem-solving', 'Team Leadership', 'Code Review', 'Performance Optimization'];

  const CircularProgress = ({ score }: { score: number }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#3b82f6"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-gray-800">{score}</span>
        </div>
      </div>
    );
  };

  if (activeTab === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Target className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">AI Job Coach</h1>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('coach')}
                  className="px-6 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  AI Coach
                </button>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium"
                >
                  Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Application Dashboard</h2>
            <p className="text-gray-600">Track your tailored applications and match scores</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Applications</p>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Avg Match Score</p>
                  <p className="text-3xl font-bold text-green-600">78%</p>
                </div>
                <Target className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">In Progress</p>
                  <p className="text-3xl font-bold text-orange-600">5</p>
                </div>
                <Edit3 className="w-8 h-8 text-orange-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Applied</p>
                  <p className="text-3xl font-bold text-blue-600">7</p>
                </div>
                <Send className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Applications List */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
            </div>
            <div className="divide-y">
              {applications.map((app) => (
                <div key={app.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-lg font-medium text-gray-900">{app.jobTitle}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          app.status === 'applied' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {app.status === 'applied' ? 'Applied' : 'Draft'}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{app.company}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {app.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{app.matchScore}%</p>
                        <p className="text-xs text-gray-500">Match</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Target className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">AI Job Coach</h1>
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('coach')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium"
              >
                AI Coach
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="px-6 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Job Description & Keywords */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Analysis</h3>
              
              {!jobData ? (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-3">Upload job description or paste URL</p>
                    <button
                      onClick={handleJobParsing}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Try Sample Job
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{jobData.title}</h4>
                    <p className="text-sm text-gray-600">{jobData.company}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Key Skills</h5>
                    <div className="flex flex-wrap gap-1">
                      {jobData.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Requirements</h5>
                    <ul className="space-y-1">
                      {jobData.requirements.map((req, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-start">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {!jobData ? (
              <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
                <Sparkles className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">AI-Powered Job Application Coach</h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Upload a job description to get started. Our AI will analyze the requirements and help you 
                  tailor your resume and cover letter for maximum impact.
                </p>
                <button
                  onClick={handleJobParsing}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Try Sample Job Description
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Match Score & Skills */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Match Score</h3>
                      <CircularProgress score={matchScore} />
                      <p className="text-sm text-gray-600 mt-2">Strong Match</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills to Highlight</h3>
                      <div className="space-y-2">
                        {skillsToHighlight.map((skill) => (
                          <div key={skill} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-700">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Missing Skills</h3>
                      <div className="space-y-2">
                        {missingSkills.map((skill) => (
                          <div key={skill} className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4 text-orange-500" />
                            <span className="text-sm text-gray-700">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resume Tailoring */}
                <div className="bg-white rounded-xl shadow-sm border">
                  <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Resume Tailoring</h3>
                  </div>
                  
                  {!resumeUploaded ? (
                    <div className="p-6">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Your Resume</h4>
                        <p className="text-gray-600 mb-4">PDF, DOC, or DOCX format</p>
                        <button
                          onClick={handleResumeUpload}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Upload Resume
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Original Resume</h4>
                          <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
                            <div className="space-y-3 text-sm">
                              <div>
                                <h5 className="font-medium">John Smith</h5>
                                <p className="text-gray-600">Frontend Developer</p>
                              </div>
                              <div>
                                <h6 className="font-medium">Experience</h6>
                                <p className="text-gray-600">• Developed web applications using React and JavaScript</p>
                                <p className="text-gray-600">• Worked with team members on various projects</p>
                                <p className="text-gray-600">• Implemented responsive designs</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">AI-Tailored Resume</h4>
                          <div className="bg-blue-50 rounded-lg p-4 h-64 overflow-y-auto border-2 border-blue-200">
                            <div className="space-y-3 text-sm">
                              <div>
                                <h5 className="font-medium">John Smith</h5>
                                <p className="text-gray-600">Senior Frontend Developer</p>
                              </div>
                              <div>
                                <h6 className="font-medium">Experience</h6>
                                <p className="text-gray-600">• <strong>Architected and developed</strong> modern web applications using <strong>React, TypeScript, and JavaScript</strong></p>
                                <p className="text-gray-600">• <strong>Led cross-functional team collaboration</strong> with UX/UI designers and backend developers</p>
                                <p className="text-gray-600">• <strong>Implemented responsive, mobile-first designs</strong> using CSS frameworks and modern best practices</p>
                                <p className="text-gray-600">• <strong>Optimized application performance</strong> resulting in 40% faster load times</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cover Letter Generator */}
                {resumeUploaded && (
                  <div className="bg-white rounded-xl shadow-sm border">
                    <div className="px-6 py-4 border-b">
                      <h3 className="text-lg font-semibold text-gray-900">AI-Generated Cover Letter</h3>
                    </div>
                    <div className="p-6">
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="prose prose-sm max-w-none">
                          <p>Dear Hiring Manager,</p>
                          <p>
                            I am excited to apply for the Senior Frontend Developer position at TechCorp Inc. 
                            With over 5 years of experience in frontend development and expertise in React, TypeScript, 
                            and modern JavaScript frameworks, I am confident I would be a valuable addition to your innovative team.
                          </p>
                          <p>
                            In my current role, I have successfully architected and developed scalable web applications 
                            using the exact technologies mentioned in your job posting. My experience with React, TypeScript, 
                            and modern build tools like Webpack and Vite aligns perfectly with your requirements. 
                            I have also led cross-functional collaborations with UX/UI designers and implemented 
                            responsive designs that improved user engagement by 40%.
                          </p>
                          <p>
                            I am particularly drawn to TechCorp's commitment to innovation and would welcome the opportunity 
                            to contribute to your team's success while mentoring junior developers and conducting thorough code reviews.
                          </p>
                          <p>Best regards,<br/>John Smith</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex space-x-3">
                        <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                          <Edit3 className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                          <Save className="w-4 h-4" />
                          <span>Save Version</span>
                        </button>
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                          <Send className="w-4 h-4" />
                          <span>Apply Now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;