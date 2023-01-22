import img from './error.jpg';

const ErrorMessage = () => {
    return (
        <img
            style={{ display: 'block', margin: '0 auto' }}
            src={img}
            alt="error"
        />
    );
};

// return <img src={process.env.PUBLIC_URL + '/error.gif'} />; чтобы с публик грузить
export default ErrorMessage;
