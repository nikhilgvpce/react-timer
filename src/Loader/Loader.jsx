import "./Loader.css";

const loadingMessage = 'Fetching time from time zone...'
const LoadingScreen = ({ isLoading }) => {
    if (!isLoading) return null;
    return (
        <>
            {/* <p>{loadingMessage}</p> */}
            <div className='loader'></div>
        </>
    )
}

export default LoadingScreen;