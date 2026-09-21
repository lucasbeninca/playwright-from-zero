# Playwright

## Commands para rodar os testes

```bash
npx playwright test
```
Runs the end-to-end tests.

```bash
npx playwright test --ui
```
Starts the interactive UI mode.

```bash
npx playwright test --project=chromium
```
Runs the tests only on Desktop Chrome.

```bash
npx playwright test example
```
Runs the tests in a specific file.

```bash
npx playwright test --debug
```
Runs the tests in debug mode.

```bash
npx playwright codegen
```
Auto generate tests with Codegen.

## Getting started

We suggest that you begin by typing:

```bash
npx playwright test
```


## Buscando elementos no HTML

### `page.getByRole()`

O método `page.getByRole()` permite localizar elementos com base em seu **papel semântico (role)**, como `button`, `link`, `textbox`, `checkbox`, entre outros.

Exemplo:

```javascript
await page
  .getByRole('button', { name: 'Aperte o play... se tiver coragem' })
  .click();
```

Nesse exemplo, o Playwright:

- procura um elemento com o papel `button`;
- verifica se o nome acessível do botão é `Aperte o play... se tiver coragem`;
- executa um clique no elemento encontrado.

### Exemplo de HTML

```html
<button>Aperte o play... se tiver coragem</button>
```

O seletor:

```javascript
page.getByRole('button', {
  name: 'Aperte o play... se tiver coragem'
})
```

irá localizar esse botão pelo seu **tipo semântico** e pelo **nome acessível**.

> `getByRole()` é uma das formas recomendadas pelo Playwright para localizar elementos, pois se aproxima da maneira como o usuário e tecnologias assistivas identificam os componentes da página.

### `page.getByPlaceholder()`

Localiza campos pelo atributo **`placeholder`**, o texto de orientação exibido quando o campo está vazio.

Exemplo de HTML:

```html
<input type="text" placeholder="Seu nome completo" />
```

Exemplo usado no teste de cadastro de lead:

```javascript
await page.getByPlaceholder('Seu nome completo').fill('usuario-teste');
```

O método localiza o campo pelo placeholder, e `fill()` preenche seu valor. Para exigir uma correspondência completa e sensível a maiúsculas e minúsculas, use `{ exact: true }`:

```javascript
await page.getByPlaceholder('Seu nome completo', { exact: true }).fill('usuario-teste');
```

Referência: [getByPlaceholder na documentação do Playwright](https://playwright.dev/docs/api/class-page#page-get-by-placeholder).

### `page.locator()`

Localiza elementos por um seletor, como **CSS** ou **XPath**.

Exemplo de HTML:

```html
<input type="email" id="email" />
```

Exemplo usado no teste de cadastro de lead:

```javascript
await page.locator('#email').fill('teste@gmail.com');
```

O seletor CSS `#email` identifica o elemento com `id="email"`, e `fill()` preenche o campo. Outros exemplos de seletores CSS são `.classe` e `input[type="email"]`.

Referência: [locator na documentação do Playwright](https://playwright.dev/docs/api/class-page#page-locator).

### `expect(page.getByTestId('modal').getByRole('heading'))`

Essa expressão prepara uma verificação sobre um título dentro do modal:

- `page.getByTestId('modal')` localiza, por padrão, o elemento com `data-testid="modal"`.
- `.getByRole('heading')` busca títulos, como `<h1>` a `<h6>`, apenas dentro desse elemento.
- `expect(...)` recebe o localizador para realizar uma asserção.

Exemplo ilustrativo de HTML:

```html
<div data-testid="modal">
  <h2>Cadastro realizado!</h2>
</div>
```

**A expressão sozinha não valida nada:** é necessário completar com uma asserção, como `toBeVisible()` ou `toHaveText()`, e usar `await`:

```javascript
await expect(page.getByTestId('modal').getByRole('heading')).toBeVisible();

await expect(page.getByTestId('modal').getByRole('heading'))
  .toHaveText('Cadastro realizado!');
```

O primeiro exemplo verifica a visibilidade; o segundo verifica o texto. O Playwright repete essas verificações até que passem ou atinjam o timeout.

Se houver vários títulos no modal, refine a busca pelo nome acessível:

```javascript
await expect(
  page.getByTestId('modal').getByRole('heading', {
    name: 'Cadastro realizado!',
    exact: true
  })
).toBeVisible();
```

Referências: [localizadores](https://playwright.dev/docs/locators) e [asserções](https://playwright.dev/docs/test-assertions) na documentação do Playwright.
