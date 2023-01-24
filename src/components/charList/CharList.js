import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/spinner';
import PropTypes from 'prop-types';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset) // здесь аргумент null и поэтому передается аргумент по умолчанию
            .then(this.onCharListLoaded)
            .catch(this.onError);
    };

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        });
    };

    onCharListLoaded = (newCharList) => {
        let ended = false;

        if (newCharList.length < 9) {
            ended = true;
        }
        this.setState(({ offset, charList }) => ({
            // чтобы формировать старый массив который это с верхнего state
            charList: [...charList, ...newCharList], // первый раз когда запускаем ...charlist будет пустой массив
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }));
    };

    renderItems(arr) {
        const items = arr.map((item) => {
            let imgStyle = { objectFit: 'cover' };
            if (
                item.thumbnail ===
                'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            ) {
                imgStyle = { objectFit: 'unset' };
            }

            return (
                <li
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}
                >
                    <img
                        src={item.thumbnail}
                        alt={item.name}
                        style={imgStyle}
                    />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });

        return <ul className="char__grid">{items}</ul>;
    }

    render() {
        const { charList, loading, error, offset, newItemLoading, charEnded } =
            this.state;
        const spinner = loading ? <Spinner /> : null;
        const items = this.renderItems(charList);
        const errorMessage = error ? <ErrorMessage /> : null;
        const CharListContent = !(loading || error) ? items : null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {CharListContent}
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{ display: charEnded ? 'none' : 'block' }}
                    onClick={() => this.onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
