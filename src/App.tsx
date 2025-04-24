import React, { useState } from 'react';

// Define a Study type for proper typing
interface Study {
  id: number;
  title: string;
  description: string;
}

const studies: Study[] = [
  {
    id: 1,
    title: 'Cognitive Memory Booster Trial',
    description: 'Study focused on the effects of new medications on early-stage Alzheimer’s.'
  },
  {
    id: 2,
    title: 'Lifestyle & Sleep Patterns Research',
    description: 'Investigating the relationship between sleep quality and cognitive decline.'
  },
  {
    id: 3,
    title: 'Genetics and Risk Factors Study',
    description: 'Study for participants with family history of Alzheimer’s.'
  }
];

function App() {
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);
  const [showSignup, setShowSignup] = useState(false);
  const [signedUpStudy, setSignedUpStudy] = useState<Study | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  // Render homepage/intro
  const renderIntro = () => (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-violet-100 p-8">
      <h1 className="text-5xl font-bold text-blue-900 mb-5 text-center">Alzheimer&apos;s Research Australia</h1>
      <p className="max-w-xl text-lg text-gray-600 mb-8 text-center">
        Advancing research to improve the lives of people living with Alzheimer’s. Participate, learn, and make a difference.
      </p>
      <button
        className="bg-blue-700 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-800 shadow-lg transition mb-12"
        onClick={() => { window.scrollTo({ top: window.innerHeight, behavior: 'smooth' }); }}
      >
        See Ongoing Studies
      </button>
    </section>
  );

  // Render ongoing studies
  const renderStudies = () => (
    <section className="min-h-screen bg-white py-16" id="studies">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">Ongoing Studies</h2>
      <div className="flex flex-row flex-wrap justify-center gap-8 px-4">
        {studies.map(study => (
          <div
            key={study.id}
            className="bg-violet-50 border border-violet-200 rounded-lg w-80 p-6 shadow-lg hover:scale-105 hover:shadow-xl cursor-pointer transition-transform"
            onClick={() => { setSelectedStudy(study); setShowSignup(true); }}
          >
            <h3 className="text-xl font-semibold text-violet-900 mb-2">{study.title}</h3>
            <p className="text-gray-700">{study.description}</p>
            <button className="mt-4 bg-violet-700 text-white px-4 py-2 rounded hover:bg-violet-800">Sign Up</button>
          </div>
        ))}
      </div>
    </section>
  );

  // Render simple modal (no external UI used yet)
  const renderSignupModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-40">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full relative">
        <button className="absolute top-3 right-4 text-2xl text-gray-300 hover:text-gray-400" onClick={() => setShowSignup(false)}>&times;</button>
        <h3 className="text-xl font-bold text-violet-800 mb-2">Sign Up: {selectedStudy?.title}</h3>
        <form onSubmit={(e) => {e.preventDefault(); setSignedUpStudy(selectedStudy); setShowSignup(false); setShowBooking(true);}} className="flex flex-col gap-4 mt-4">
          <input required className="border p-2 rounded" placeholder="Full Name" />
          <input required type="number" className="border p-2 rounded" placeholder="Age" />
          <select required className="border p-2 rounded">
            <option value="">Gender</option>
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select>
          <input required className="border p-2 rounded" placeholder="Blood Pressure (e.g., 120/80)" />
          <input required type="number" className="border p-2 rounded" placeholder="Heart Rate (bpm)" />
          <button className="bg-violet-700 text-white py-2 rounded hover:bg-violet-800">Submit & Check Eligibility</button>
        </form>
      </div>
    </div>
  );

  // Render appointment booking modal
  const renderBookingModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-40">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full relative">
        <button className="absolute top-3 right-4 text-2xl text-gray-300 hover:text-gray-400" onClick={() => setShowBooking(false)}>&times;</button>
        <h3 className="text-xl font-bold text-blue-800 mb-2">Book a Preliminary Appointment</h3>
        <p className="mb-4">You&apos;ve been signed up for: <b>{signedUpStudy?.title}</b></p>
        <form onSubmit={(e) => {e.preventDefault(); setShowBooking(false); alert('Appointment booked! (demo)');}} className="flex flex-col gap-4 mt-4">
          <input required type="date" className="border p-2 rounded" />
          <input required type="time" className="border p-2 rounded" />
          <button className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800">Confirm Appointment</button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="font-sans">
      {renderIntro()}
      {renderStudies()}
      {showSignup && renderSignupModal()}
      {showBooking && renderBookingModal()}
    </div>
  );
}

export default App;
