import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import Map from '@/components/Map';
import { techProjects, workProjects } from '@/data/projects';

const placeholderImage = 'https://cdn.flyonui.com/fy-assets/components/card/image-9.png';
const projectImageMap: Record<string, string> = {
  'Seewaan Nostr Client': '/Resume/assets/seewaan.png',
  'Nostr Arabia Relay & Media': '/Resume/assets/nostrarabia.png',
  'Mempool TV': '/Resume/assets/mempoolTV.png',
  'nostrTV (tvOS & AndroidTV)': '/Resume/assets/nostrTV.png',
  FastDiet: '/Resume/assets/fastdiet.webp',
};

type StatusStyle = {
  statusClass: string;
  textClass: string;
  label: string;
};

const getStatusStyle = (status?: string): StatusStyle => {
  const key = status?.toLowerCase() ?? '';
  if (key === 'active') {
    return {
      statusClass: 'status-success',
      textClass: 'text-success',
      label: 'Active',
    };
  }
  if (key === 'released') {
    return {
      statusClass: 'status-primary',
      textClass: 'text-primary',
      label: 'Released',
    };
  }
  if (key === 'work in progress' || key === 'in progress') {
    return {
      statusClass: 'status-warning',
      textClass: 'text-warning',
      label: 'In Progress',
    };
  }
  return {
    statusClass: 'status-primary',
    textClass: 'text-primary',
    label: status || 'Ongoing',
  };
};

const Home = () => {
  return (
    <Layout>
      <section className="hero">
        <div className="hero-content flex-col gap-6">
            <div className="card bg-white dark:bg-slate-900 shadow-sm border border-slate-200/60 dark:border-slate-700/60 w-full">
              <div className="card-body space-y-3">
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-primary badge-lg text-white">Human Capital Development</span>
                <span className="badge badge-primary badge-lg text-white">Strategy</span>
                <span className="badge badge-primary badge-lg text-white">Org Design</span>
                <span className="badge badge-primary badge-lg text-white">Workforce Planning</span>
                <span className="badge badge-primary badge-lg text-white">Power Apps</span>
                <span className="badge badge-primary badge-lg text-white">Power BI</span>
                <span className="badge badge-primary badge-lg text-white">Power Automate</span>
              </div>
                <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900 dark:text-white">
                  Take your HR Team to a whole new level!
              </h1>
              <p className="text-lg text-slate-700 dark:text-slate-300">
                Management Consultant with over a decade of experience in <strong>Human Capital and workforce development</strong>, supporting federal and private-sector clients. I help human capital teams increase effectiveness by designing and deploying <strong>Power Platform solutions</strong>, data analytics, and AI-enabled tools—bringing <strong>exceptional proficiency in applying AI technologies to design, build, and accelerate technical solutions</strong> that modernize systems, strengthen insights, and improve overall performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="card glass dark:bg-slate-900 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Global Footprint</p>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Regional Projects</h2>
              </div>
            </div>
            <div className="mt-4 w-full h-[300px] sm:h-[350px] lg:h-[396px] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
              <Map />
            </div>
            <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              Hover over each city to explore engagements delivered in that region.
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 scroll-mt-24" id="portfolio">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Github Portfolio</h2>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {techProjects.map((project) => {
            const style = getStatusStyle(project.status);
            return (
              <div key={project.title} className="card sm:max-w-sm bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-700">
                <figure>
                  <Image
                    src={projectImageMap[project.title] || placeholderImage}
                    alt={project.title}
                    width={400}
                    height={195}
                    className="h-[195px] w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="card-title mb-0">{project.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 *:flex *:items-center *:gap-2 mb-2">
                    <div>
                      <div aria-label="status" className={`status ${style.statusClass}`}></div>
                      <span className={style.textClass}>{style.label}</span>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-4 whitespace-pre-line">{project.summary}</p>
                  <div className="card-actions flex flex-wrap gap-2">
                    {project.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-soft btn-primary btn-sm"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-12 scroll-mt-24" id="work-projects">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Work Projects (Power Platform & BI)</h2>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {workProjects.map((project) => {
            const style = getStatusStyle(project.status);
            return (
              <div key={project.title} className="card sm:max-w-sm bg-white dark:bg-slate-900 shadow-lg border border-slate-100 dark:border-slate-700">
                <div className="card-body">
                  <h3 className="card-title mb-2.5">{project.title}</h3>
                  <div className="flex items-center gap-4 *:flex *:items-center *:gap-2 mb-2">
                    <div>
                      <div aria-label="status" className={`status ${style.statusClass}`}></div>
                      <span className={style.textClass}>{style.label}</span>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-4 whitespace-pre-line">{project.summary}</p>
                  <div className="card-actions flex flex-wrap gap-2 items-center justify-between">
                    {project.links.length > 0 ? (
                      project.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-soft btn-primary btn-sm"
                        >
                          {link.label}
                        </a>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500">Internal asset</span>
                    )}
                    <span
                      className={`badge text-[11px] ${
                        project.title === 'Mentorship Program'
                          ? 'bg-[#a4328a] text-white border-[#a4328a]'
                          : 'bg-[#f2c811] text-black border-[#f2c811]'
                      }`}
                    >
                      {project.title === 'Mentorship Program' ? 'Power App' : 'Power BI'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
