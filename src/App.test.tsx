import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import App from './App'
import Menu from './menu/Menu'
import Game from './game/components/Game'
import {checkWinner} from "./game/utils/checkWinner";
import InfoLabel from "./game/components/InfoLabel";
import {handleMove} from "./game/utils/handleMove";

describe('Tous les tests', () => {
  test('Le titre est affiché', () => {
    const {getByText} = render(<App/>)
    const linkElement = getByText(/Puissance 4/i)
    expect(linkElement).toBeInTheDocument()
  })

  describe('Menu tests', () => {
    test("Menu ne lance pas la partie si le nom de joueurs n'est pas renseigné", () => {
      const handleStartGame = jest.fn()
      const {getByText} = render(<Menu onStartGame={handleStartGame}/>)
      const button = getByText('Lancer la partie')
      //on clique sur le bouton sans renseigner les pseudos
      fireEvent.click(button)
      //on vérifie que la fonction onStartGame n'a pas été appelée
      expect(handleStartGame).not.toHaveBeenCalled()
    })

    test('Menu lance la partie avec le bon nom des joueurs', () => {
      const handleStartGame = jest.fn()
      const {getByPlaceholderText, getByText} = render(<Menu onStartGame={handleStartGame}/>)
      const button = getByText('Lancer la partie')
      const input1 = getByPlaceholderText('Pseudo joueur 1') as HTMLInputElement
      const input2 = getByPlaceholderText('Pseudo joueur 2') as HTMLInputElement
      //On modifie les valeurs des inputs puis on clique sur le bouton
      fireEvent.change(input1, {target: {value: 'Player 1'}})
      fireEvent.change(input2, {target: {value: 'Player 2'}})
      fireEvent.click(button)
      //on vérifie que la fonction onStartGame a bien été appelée avec les bons paramètres (pseudos des joueurs)
      expect(handleStartGame).toHaveBeenCalledWith('Player 1', 'Player 2')
    })
  })

  describe('Game tests', () => {
    test('InfoLabel affiche le tour du joueur 1', () => {
      const {getByText} = render(<Game player1="Player 1" player2="Player 2"/>)
      const playerTurn = getByText("C'est au tour de Player 1")
      expect(playerTurn).toBeInTheDocument()
    })

    test("On n'autorisera pas le joueur à jouer dans une colonne pleine", () => {
      //chaque ligne représente une colonne (il faut lire en faisant une rotation de 90 degrés vers la gauche)
      const grid = [
        ['red', 'blue', 'red', 'blue', 'red', 'blue'],
        ['', '', '', '', '', ''],
        ['blue', 'red', '', '', '', ''],
        ['blue', '', '', '', '', ''],
        ['red', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', '']
      ]
      const newGrid = handleMove(grid, 'red', 0)
      //cela devrait être égal à la grille initiale
      expect(newGrid).toEqual(grid)
    })

    test("InfoLabel affiche la victoire d'un joueur", () => {
      const {getByText} = render(<InfoLabel currentPlayer={"on s'en fiche"} winner={"Bonjour"}/>)
      const playerTurn = getByText("Bonjour a gagné !")
      expect(playerTurn).toBeInTheDocument()
    })

    describe('Vérification de la victoire', () => {
      //chaque ligne représente une colonne (il faut lire en faisant une rotation de 90 degrés vers la gauche)
      test('Détecte une victoire pour le joueur rouge (verticale)', () => {
        const grid = [
          ['red', '', '', '', '', '', ''],
          ['blue', '', '', '', '', '', ''],
          ['red', 'red', 'red', 'red', '', '', ''],
          ['blue', '', '', '', '', '', ''],
          ['blue', '', '', '', '', '', ''],
          ['blue', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '']
        ]
        expect(checkWinner(grid)).toBe('red')
      })

      test('Détecte une victoire pour le joueur rouge (diagonale)', () => {
        const grid = [
          ['blue', '', '', '', '', '', ''],
          ['', '', '', '', '', '', ''],
          ['red', 'red', '', '', '', '', ''],
          ['blue', 'red', '', '', '', '', ''],
          ['red', 'blue', 'red', 'blue', '', '', ''],
          ['red', 'blue', 'blue', 'red', '', '', ''],
          ['', '', '', '', '', '', '']
        ]
        expect(checkWinner(grid)).toBe('red')
      })

      test('Détecte une victoire pour le joueur bleu (horizontale)', () => {
        const grid = [
          ['red', '', '', '', '', '', ''],
          ['', '', '', '', '', '', ''],
          ['red', 'red', 'red', '', '', '', ''],
          ['blue', '', '', '', '', '', ''],
          ['blue', '', '', '', '', '', ''],
          ['blue', '', '', '', '', '', ''],
          ['blue', '', '', '', '', '', '']
        ]
        expect(checkWinner(grid)).toBe('blue')
      })

      test('Détecte une victoire pour le joueur bleu (anti-diagonale)', () => {
        const grid = [
          ['', '', '', '', '', '', ''],
          ['blue', 'red', 'red', 'blue', '', '', ''],
          ['red', 'red', 'blue', 'red', '', '', ''],
          ['red', 'blue', '', '', '', '', ''],
          ['blue', 'blue', '', '', '', '', ''],
          ['', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '']
        ]
        expect(checkWinner(grid)).toBe('blue')
      })

      test('Retourne null si pas de victoire', () => {
        const grid = [
          ['red', '', '', '', '', '', ''],
          ['blue', '', '', '', '', '', ''],
          ['red', 'blue', 'blue', '', '', '', ''],
          ['red', '', '', '', '', '', ''],
          ['', '', '', '', '', '', ''],
          ['', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '']
        ]
        expect(checkWinner(grid)).toBeNull()
      })
    })
  })
})