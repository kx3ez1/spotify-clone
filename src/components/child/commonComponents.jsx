import { useEffect, useState } from 'react';
import NavBackArrow from '../../assets/nav-back-arrow.svg';
import { parseSanitizedHTML } from './utils';
import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


export const LoadingComponent = () => {
    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <div className='text-white text-2xl'>Loading...</div>
        </div>
    );
}

export const BackNavigationWithTitle = ({ title, navColor }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            // scroll to bottom of page
            const scrollThreshold = 10;

            setIsScrolled(scrollPosition > scrollThreshold);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className={`p-6 flex items-center sticky top-0 z-10 ${isScrolled ? 'bg-spotify-black opacity-85' : navColor // Apply black background on scroll
                }`}
        >
            <img
                src={NavBackArrow}
                alt="Back Arrow"
                className="w-6 h-6 cursor-pointer"
                onClick={
                    () => {
                        if (window.history.length > 2) {
                            window.history.back();
                        } else {
                            navigate('/')
                        }
                    }
                }
            />
            {isScrolled && (
                <div className="text-spotify-white font-semibold ml-4"
                    onClick={
                        () => {
                            if (window.history.length > 2) {
                                window.history.back();
                            } else {
                                navigate('/')
                            }
                        }
                    }
                >
                    {parseSanitizedHTML(title)}
                </div>
            )}
        </div>
    );
};


BackNavigationWithTitle.propTypes = {
    title: propTypes.string.isRequired,
    navColor: propTypes.string,
}