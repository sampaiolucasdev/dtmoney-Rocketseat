import styled from "styled-components";

export const Container = styled.header`
    background: var(--blue);
`;

export const Content = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    padding: 2rem 1rem 12rem; //1rem = 100% font-size / 1rem = 16px de padding nas laterais e 160px de padding embaixo
    display: flex;
    align-items:center;
    justify-content: space-between;

    button {
        font-size: 1rem;
        color: #FFF;
        background: var(--blue-light);
        border: 0;
        padding: 0 2rem;
        border-radius: 0.25rem;
        height: 3rem;

        transition: filter 0.2s; //QUANDO A PROPRIEDADE filter FOR ALTERADA (PASSANDO MOUSE), VAI FAZER UMA TRANSIÇÃO DE 0.2s

        &:hover { //QUANDO PASSAR O MOUSE EM CIMA
            filter: brightness (0.9);
        }
    }
`;