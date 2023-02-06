import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { nav } from '../../navigation/Navigation';
import { setLogoutUser } from '../../redux/Slice/user';
import Button from '../Button';
import Modal from '../Modal';


const Header = () => {
    const [showModal, setShowModal] = React.useState(false);
    const [showSecondModal, setShowSecondModal] = React.useState(false);
    const nodeRef = React.useRef(null);
    const nodeSecondRef = React.useRef(null);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    const showNextModal = () => {
        setShowModal(false)
        setShowSecondModal(true)
    }

    const elementsForFirstModal = {
        title: <span>WYBIERZ TYP KONTA</span>,
        content: {
            right: {
                title: 'NOWE KONTO FIRMOWE',
                subTitle: 'Nie posiadam działaności gospodarczej',
                p: [
                    'Sprawdzanie ogłoszeń z Crew Network',
                    'Przyjmowanie zleceń',
                    'Korzystanie z kalendarza osobistego'
                ],
                button:
                    <Link to='register'>
                        <Button onClick={() => setShowModal(false)}
                            className='py-1 px-2.5 bg-stone-700 rounded-md text-white text-sm' title='ZAREJESTRUJ' />
                    </Link>

            },
            left: {
                title: 'KONTO INDYWIDUALNE',
                subTitle: ' Posiadam działalność gospodarczą lub spółkę',
                p: [
                    'Dodawania sprzętu w Cross Rental network',
                    'Wystawienia sprzętu na sprzedaż',
                    'Dodawanie riderów technicznych',
                    'Tworzenie i dołączanie do zakupów grupowych',
                    'Publikowanie ogłoszeń w Crew Network',
                    'Darmowa wersja systemu NEW Basic',
                    'Dodawanie nowych lokalizacji, zdjęć i planów',
                    'Sprawdzanie ogłoszeń z Crew Network',
                    'Przyjmowanie zleceń',
                    'Korzystanie z kalendarza osobistego'
                ],
                button:
                    <Button onClick={showNextModal} className='py-1 px-2.5 bg-stone-700 rounded-md text-white text-sm'
                        title='ZAREJESTRUJ' />,

            },
            text: 'Jesteś pracownikiem a Twoja firma ma już konto na Event Network. Poproś o dostęp administratora systemu w swojej organizacji'
        }
    }

    const elementsForSecondModal = {
        title: <span>OPCJE KONTA DLA CREW NETWORK</span>,
        content: {
            right: {
                title: 'ZLECENIOBIORCA',
                subTitle: 'Jestem freelancerem. Posiadam działalność gospodarczą Będę również przyjmować zlecenia na pracę',
                p: [
                    'Sprawdzanie ogłoszeń z Crew Network',
                    'Przyjmowanie zleceń',
                    'Korzystanie z kalendarza osobistego',
                    'Możliwość wystawiania faktur'
                ],
                button:
                    <Link to='reg-firm'>
                        <Button onClick={() => setShowSecondModal(false)}
                            className='py-1 px-2.5 bg-stone-700 rounded-md text-white text-sm' title='ZAREJESTRUJ' />
                    </Link>

            },
            left: {
                title: 'ZLECENODWAWCA',
                subTitle: 'Firma będzie tylko publikować ogłoszenia w poszukiwaniu freelancerów',
                p: [
                    'Możesz dodawać wielu użytkowników do zarządzania Twoją firmą w event network',
                    'Publikacja ogłoszeń w Crew Network',
                ],
                button:
                    <Link to='reg-firm'>
                        <Button onClick={() => setShowSecondModal(false)}
                            className='py-1 px-2.5 bg-stone-700 rounded-md text-white text-sm' title='ZAREJESTRUJ' />,
                    </Link>

            },
            // text: 'Jesteś pracownikiem a Twoja firma ma już konto na Event Network. Poproś o dostęp administratora systemu w swojej organizacji'
        }
    }

    const logoutUser = () => {
        dispatch(setLogoutUser())
    }

    return (

        <>
            <div style={{ margin: '15px 25px 0 100px', width: '92%' }}>
                <div className="flex items-center justify-between">
                    <Link to='/'>
                        <img src="https://cross-rental.newsystems.pl/themes/e4e/img/Image%205%20Copy@1x.png" alt="Cross rental"
                            className="w-auto" />
                    </Link>
                    <nav style={{ width: '60%' }}>
                        <ul className='flex items-center justify-between' style={{ listStyle: 'none' }}>
                            {
                                nav.headerNav.map((el, idx) => (
                                    <li className='text-sm ' key={idx}>
                                        <Link style={{ textDecoration: 'none', color: 'black' }}
                                            to={el.path}>{el.name}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                    <div className="flex items-center justify-between">
                        {
                            user
                                ? <div className="p-2 border mr-4"><span className='text-[15px]'>{user?.nickname}</span></div>
                                : <>
                                    <Button onClick={() => setShowModal(true)}
                                        className='py-1 px-2.5 mr-2 bg-stone-700 rounded-md text-white text-sm'
                                        title='ZAREJESTRUJ' />
                                    <Button className='py-1 px-2.5 text-sm' title='ANG' />
                                </>
                        }
                        {
                            user
                                ? <Button onClick={logoutUser} className='py-1 px-2.5 text-sm' title='Logout' />
                                : <Link to='/login'>
                                    <Button className='py-1 px-2.5 text-sm' title='Login' />
                                </Link>
                        }
                    </div>
                </div>
            </div>
            <CSSTransition
                in={showModal}
                nodeRef={nodeRef}
                timeout={400}
                classNames="alert"
                unmountOnExit
                appear
            >
                <Modal myRef={nodeRef} setShowModal={setShowModal} showModal={showModal}
                    elements={elementsForFirstModal} />
            </CSSTransition>
            <CSSTransition
                in={showSecondModal}
                nodeRef={nodeSecondRef}
                timeout={400}
                classNames="alert"
                unmountOnExit
                appear
            >
                <Modal myRef={nodeSecondRef} setShowModal={setShowSecondModal} showModal={showSecondModal}
                    elements={elementsForSecondModal} />
            </CSSTransition>
        </>
    );
};

export default Header;