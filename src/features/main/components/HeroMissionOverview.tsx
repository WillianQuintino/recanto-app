import heroImage from '@/assets/img/hero-recanto.jpg';

const HeroMissionOverview = () => {
  return (
    <div
  className="hero min-h-screen"
  style={{
    backgroundImage: `url(${heroImage.src})`,
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Recanto do Amor Misericordioso</h1>
      <p className="mb-5">
        Somos uma comunidade católica em Sumaré dedicada a &quot;vivenciar o Amor Misericordioso de Jesus Cristo&quot;, realizando retiros e encontros que 
        avivam os corações e transformam histórias de vida. Nosso apostolado é voltado para crianças, jovens e famílias, promovendo educação integral 
        e aperfeiçoamento das virtudes.
      </p>
      <button className="btn btn-primary">Participe de um Retiro</button>
    </div>
  </div>
</div>
  );
};

export default HeroMissionOverview;
