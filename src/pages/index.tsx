import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import Map from '@/components/Map';
import { techProjects, workProjects } from '@/data/projects';
import resumeData from '@/data/resume-data.json';

const placeholderImage = 'https://cdn.flyonui.com/fy-assets/components/card/image-9.png';

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
      <section className="hero bg-base-100">
        <div className="hero-content flex-col gap-6">
          <div className="card bg-transparent shadow-sm border border-slate-200/60 w-full">
            <div className="card-body space-y-3">
              <div className="badge badge-primary badge-lg text-white">
                Strategy, Workforce Planning, Nostr & Product
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900">
                Building resilient teams and products across regions
              </h1>
              <p className="text-lg text-slate-700">{resumeData.summary}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="card glass shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Global Footprint</p>
                <h2 className="text-2xl font-bold text-slate-900">Projects by City</h2>
              </div>
            </div>
            <div className="mt-4 w-full h-[360px] rounded-lg overflow-hidden border border-slate-200">
              <Map />
            </div>
            <div className="mt-4 text-sm text-slate-600">
              Hover over each city to explore engagements and products delivered in that region.
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 scroll-mt-24" id="portfolio">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900">Portfolio</h2>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {techProjects.map((project) => {
            const style = getStatusStyle(project.status);
            return (
              <div key={project.title} className="card sm:max-w-sm bg-white shadow-xl border border-slate-100">
                <figure>
                  <Image
                    src={placeholderImage}
                    alt={project.title}
                    width={400}
                    height={260}
                    className="h-full w-full object-cover"
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
                  <p className="text-slate-700 mb-4">{project.summary}</p>
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
          <h2 className="text-2xl font-bold text-slate-900">Work Projects (Power Platform & BI)</h2>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {workProjects.map((project) => {
            const style = getStatusStyle(project.status);
            return (
              <div key={project.title} className="card sm:max-w-sm bg-white shadow-lg border border-slate-100">
                <div className="card-body">
                  <h3 className="card-title mb-2.5">{project.title}</h3>
                  <div className="flex items-center gap-4 *:flex *:items-center *:gap-2 mb-2">
                    <div>
                      <div aria-label="status" className={`status ${style.statusClass}`}></div>
                      <span className={style.textClass}>{style.label}</span>
                    </div>
                  </div>
                  <p className="text-slate-700 mb-4">{project.summary}</p>
                  <div className="card-actions flex flex-wrap gap-2">
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
