import Layout from '@/components/layout/Layout';
import resumeData from '@/data/resume-data.json';

const ConsultingPage = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Human Capital</h1>
      <div className="space-y-6">
        {resumeData.experience.map((job, index) => (
          <div
            key={index}
            className="card bg-white shadow-md border border-slate-200"
          >
            <div className="card-body space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold">{job.title}</h2>
                  <p className="text-lg font-semibold">{job.company}</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="badge text-[11px] bg-[#f2c811] text-black border border-[#f2c811]">
                      {job.location}
                    </span>
                    <span className="badge text-[11px] bg-slate-800 text-white border border-slate-800">
                      {job.date === '02/2021 – Present' ? '02/2021 - 09/2024' : job.date}
                    </span>
                  </div>
                </div>
              </div>
              <ul className="list-disc pl-5 space-y-2 marker:text-slate-700">
                {job.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ConsultingPage;
