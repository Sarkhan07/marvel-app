import { Component } from 'react';
import ErrorMessage from '../errorMessage/errorMessage';

class ErrorBoundary extends Component {
    state = {
        error: false,
    };

    // static getDerivedStateFromError(error) {
    //это обновляет только состояние
    //     return { error: true };
    // }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: true,
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />;
        }

        return this.props.children; // это ребенок который был передан внутрь componentDidCatch
        // предохранители не ловят ошибки внутри обработчиков события, в асинхронных кодах, и в дочерних компонентах,
        //  не внутри себя
    }
}

export default ErrorBoundary;
