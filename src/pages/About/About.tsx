const About: React.FC = () => {
  return (
    <div className="container mx-auto my-4 p-6 bg-light-secondary dark:bg-dark-secondary rounded-md shadow-md space-y-6">
      <h1 className="text-4xl font-bold text-center">About Us</h1>
      <section className="bg-light-primary dark:bg-dark-primary rounded-md shadow-md space-y-4 p-4">
        <h2 className="text-3xl font-semibold">Our Mission</h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary text-start">
          Our mission is to create high-quality streaming platforms that bring
          people together. We strive to provide content that entertains,
          informs, and inspires, crafting a unique user experience. We
          continuously push the boundaries of what's possible in the world of
          digital entertainment.
        </p>
        <p className="text-light-text-secondary dark:text-dark-text-secondary text-start">
          By creating a space for connection, shared experiences, and new
          discoveries, we aim to transform how people enjoy content. Our efforts
          focus on enabling every user to feel emotions, take journeys, and
          explore through the screen.
        </p>
      </section>

      <section className="bg-light-primary dark:bg-dark-primary rounded-md shadow-md space-y-4 p-4">
        <h2 className="text-3xl font-semibold">Our History</h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary text-start">
          Founded in 2010, our company started as a small startup with a big
          dream. We set out to create something unique — a platform that would
          revolutionize media consumption. Since then, we have come a long way,
          becoming one of the industry's leading platforms.
        </p>
        <p className="text-light-text-secondary dark:text-dark-text-secondary text-start">
          Over the years, we've introduced new features, expanded user
          capabilities, and constantly improved our service. Our success has
          been made possible by the continuous support of our customers and a
          team of professionals who always find new ways to achieve the best
          results.
        </p>
      </section>

      <section className="bg-light-primary dark:bg-dark-primary rounded-md shadow-md space-y-4 p-4">
        <h2 className="text-3xl font-semibold">Our Team</h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary text-start">
          Our team consists of talented and passionate professionals united by a
          common goal — creating innovative solutions and ensuring the highest
          quality of products and services. From engineers and designers to
          marketers and analysts, each of us brings expertise and creativity to
          the growth of our platform.
        </p>
        <p className="text-light-text-secondary dark:text-dark-text-secondary text-start">
          We believe in the power of teamwork and the importance of
          collaboration. Thanks to our collective efforts, we're able to turn
          the most complex ideas into reality and continuously improve our
          service for our users.
        </p>
      </section>

      <section className="bg-light-primary dark:bg-dark-primary rounded-md shadow-md space-y-4 p-4">
        <h2 className="text-3xl font-semibold">Our Achievements</h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary text-start">
          We have received numerous awards for our innovation, customer service,
          and commitment to excellence. Among our accomplishments are awards for
          best service in the streaming platform industry and recognition for
          creative approaches to user experience.
        </p>
        <p className="text-light-text-secondary dark:text-dark-text-secondary text-start">
          These achievements inspire us to continue growing and improving. We're
          proud of what we've accomplished, but our sights are always set on the
          future. We believe the best moments are yet to come, and we are ready
          to work even harder to reach new heights.
        </p>
      </section>
    </div>
  );
};

export default About;
