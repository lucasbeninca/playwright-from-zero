// @ts-check
import { test, expect } from '@playwright/test';

test('valida se a pagina inicial carregou', async({page}) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Zombie+ | Mais que um streaming, uma experiência arrepiante!");

});

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByRole('button', {name: /Aperte o play... se tiver coragem/}).click();

  expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera')

  //Fila de espera

  await page.getByPlaceholder('Seu nome completo').fill('usuario-teste')
  await page.locator('#email').fill('teste@gmail.com')

  await page.getByRole('button', {name: /Quero entrar na fila!/}).click()



})
