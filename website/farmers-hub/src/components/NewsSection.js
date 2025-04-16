import { newsData } from "../mockData";

function NewsSection() {
  return (
    <section id="news" className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Latest Crop News
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsData.map((news, index) => (
            <div key={index} className="bg-white p-4 rounded shadow card">
              <h3 className="text-lg font-semibold">{news.title}</h3>
              <p>{news.excerpt}</p>
              <a href={news.url} className="text-green-600 hover:underline">
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewsSection;
