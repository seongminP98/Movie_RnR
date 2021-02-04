import React from 'react';
import MovieCard from '../../components/MovieCard';

type movie = {
  id: number;
  title: string;
  genres: string;
  rates: number;
  overview: string;
};

type HomeProps = {
  recent: Array<movie>;
  loading: boolean;
};

const Home = ({ recent, loading }: HomeProps) => {
  return (
    <div>
      {loading ? (
        <div className="w-full h-full flex justify-center">
          <div className="text-gray-darker mt-32 sm:mt-32 md:mt-52 lg:mt-80">
            <i className="fas fa-circle-notch fa-spin fa-5x"></i>
          </div>
        </div>
      ) : (
        <>
          <div className="w-screen text-center text-2xl pt-10">Recent 20 Postings</div>
          <div className="flex justify-center pt-10">
            <div className="flex justify-center flex-wrap w-10/12">
              {recent.map((m) => (
                <MovieCard id={m.id} title={m.title} genres={m.genres} rates={m.rates} overview={m.overview} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
