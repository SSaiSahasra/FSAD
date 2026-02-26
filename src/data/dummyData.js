export const users = [
  { id: 1, email: 'admin@conference.com', password: 'admin123', role: 'admin', name: 'Admin User' },
  { id: 2, email: 'user@example.com', password: 'user123', role: 'user', name: 'John Doe', affiliation: 'MIT', bio: 'Researcher in AI' }
];

export const submissions = [
  {
    id: 1,
    userId: 2,
    title: 'Deep Learning Approaches for Natural Language Processing',
    abstract: 'This paper explores various deep learning architectures for NLP tasks...',
    authors: 'John Doe, Jane Smith',
    keywords: 'Deep Learning, NLP, Transformers',
    status: 'pending',
    submittedDate: '2024-01-15',
    pdfUrl: '/papers/paper1.pdf',
    reviewerId: null,
    feedback: ''
  },
  {
    id: 2,
    userId: 2,
    title: 'Quantum Computing Applications in Cryptography',
    abstract: 'An analysis of quantum computing impact on modern cryptographic systems...',
    authors: 'John Doe',
    keywords: 'Quantum Computing, Cryptography, Security',
    status: 'accepted',
    submittedDate: '2024-01-10',
    pdfUrl: '/papers/paper2.pdf',
    reviewerId: 3,
    feedback: 'Excellent work with novel insights'
  }
];

export const reviewers = [
  { id: 3, name: 'Dr. Sarah Johnson', expertise: 'Machine Learning, AI', email: 'sarah@university.edu' },
  { id: 4, name: 'Prof. Michael Chen', expertise: 'Quantum Computing', email: 'mchen@tech.edu' },
  { id: 5, name: 'Dr. Emily Brown', expertise: 'Cybersecurity', email: 'ebrown@institute.edu' }
];

export const schedule = [
  {
    id: 1,
    date: '2024-03-15',
    sessions: [
      {
        id: 1,
        time: '09:00 - 10:30',
        title: 'Keynote: Future of AI',
        speaker: 'Dr. Alan Turing',
        room: 'Main Hall',
        type: 'keynote'
      },
      {
        id: 2,
        time: '11:00 - 12:30',
        title: 'Machine Learning Track',
        speaker: 'Multiple Speakers',
        room: 'Room A',
        type: 'session'
      }
    ]
  },
  {
    id: 2,
    date: '2024-03-16',
    sessions: [
      {
        id: 3,
        time: '09:00 - 10:30',
        title: 'Quantum Computing Advances',
        speaker: 'Prof. Michael Chen',
        room: 'Room B',
        type: 'session'
      }
    ]
  }
];

export const registrations = [
  { id: 1, userId: 2, userName: 'John Doe', email: 'user@example.com', registeredDate: '2024-01-20', ticketType: 'Full Conference' }
];

export const stats = {
  totalSubmissions: 45,
  acceptedPapers: 28,
  pendingReviews: 12,
  registeredParticipants: 156
};
