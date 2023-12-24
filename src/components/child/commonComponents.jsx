import { useEffect, useState } from 'react';
import NavBackArrow from '../../assets/nav-back-arrow.svg';
import { parseSanitizedHTML } from './utils';
import propTypes from 'prop-types';


export const LoadingComponent = () => {
    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <div className='text-white text-2xl'>Loading...</div>
        </div>
    );
}

export const BackNavigationWithTitle = ({ title }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            // scroll to bottom of page
            const scrollThreshold = 0;

            setIsScrolled(scrollPosition > scrollThreshold);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className={`p-6 flex items-center sticky top-0 z-10 ${isScrolled ? 'bg-spotify-black opacity-85' : 'bg-spotify-playlist_1' // Apply black background on scroll
                }`}
        >
            <img
                src={NavBackArrow}
                alt="Back Arrow"
                className="w-6 h-6 cursor-pointer"
                onClick={() => window.history.back()}
            />
            {isScrolled && (
                <div className="text-spotify-white font-semibold ml-4">
                    {parseSanitizedHTML(title)}
                </div>
            )}
        </div>
    );
};


BackNavigationWithTitle.propTypes = {
    title: propTypes.string.isRequired
}