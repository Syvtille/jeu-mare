import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import App from './App'
import Menu from './menu/Menu'
import Game from './game/components/Game'
import {checkWinner} from "./game/utils/checkWinner";
import InfoLabel from "./game/components/InfoLabel";

describe('Tous les tests', () => {
  test('Title is displayed', () => {
    const {getByText} = render(<App/>)
    const linkElement = getByText(/Puissance 4/i)
    expect(linkElement).toBeInTheDocument()
  })

  describe('Menu tests', () => {
    test('Menu affiche les champs pour les pseudos', () => {
      const handleStartGame = jest.fn()
      const {getByPlaceholderText} = render(<Menu onStartGame={handleStartGame}/>)
      const input1 = getByPlaceholderText('Pseudo joueur 1') as HTMLInputElement
      const input2 = getByPlaceholderText('Pseudo joueur 2') as HTMLInputElement
      fireEvent.change(input1, {target: {value: 'Player 1'}})
      fireEvent.change(input2, {target: {value: 'Player 2'}})
      expect(input1.value).toBe('Player 1')
      expect(input2.value).toBe('Player 2')
    })
  })

  describe('Game tests', () => {
    test('InfoLabel affiche le tour du joueur 1', () => {
      const {getByText} = render(<Game player1="Player 1" player2="Player 2"/>)
      const playerTurn = getByText("C'est au tour de Player 1")
      expect(playerTurn).toBeInTheDocument()
    })

    test("InfoLabel affiche la victoire d'un joueur", () => {
      const {getByText} = render(<InfoLabel currentPlayer={"on s'en fiche"} winner={"Florian"}/>)
      const playerTurn = getByText("Florian a gagné !")
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