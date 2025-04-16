function HeroSection() {
  return (
    <section
      className="bg-cover bg-center h-96 flex items-center justify-center text-white text-shadow"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1500595046743-ee5a8a800ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
      }}
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">
          Empowering Farmers, Connecting Buyers
        </h2>
        <p className="text-lg">
          Your one-stop platform for crop prices, news, and marketplace.
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
