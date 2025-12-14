import Layout from '@/components/layout/Layout';
import resumeData from '@/data/resume-data.json';

const ConsultingPage = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Consulting & HR Experience</h1>
      <div className="space-y-8">
        {resumeData.experience.map((job, index) => (
          <div key={index}>
            <h2 className="text-2xl font-bold">{job.title}</h2>
            <p className="text-lg font-semibold">{job.company} - {job.location}</p>
            <p className="text-md text-gray-600 mb-2">{job.date}</p>
            <ul className="list-disc list-inside space-y-2">
              {job.description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ConsultingPage;
