/* eslint-disable jest/no-standalone-expect */
import { createNextDescribe } from 'e2e-utils'
import { check } from 'next-test-utils'

createNextDescribe(
  'app-dir action progressive enhancement',
  {
    files: __dirname,
    dependencies: {
      react: 'latest',
      nanoid: 'latest',
      'react-dom': 'latest',
      'server-only': 'latest',
    },
  },
  ({ next, isNextDev, isNextStart, isNextDeploy }) => {
    it('should support formData and redirect without JS', async () => {
      const browser = await next.browser('/server', {
        disableJavaScript: true,
      })

      await browser.eval(`document.getElementById('name').value = 'test'`)
      await browser.elementByCss('#submit').click()

      await check(() => {
        return browser.eval('window.location.pathname + window.location.search')
      }, '/header?name=test&constructor=FormData&hidden-info=hi')
    })

    it('should support actions from client without JS', async () => {
      const browser = await next.browser('/server', {
        disableJavaScript: true,
      })

      await browser.eval(
        `document.getElementById('client-name').value = 'test'`
      )
      await browser.elementByCss('#there').click()

      await check(() => {
        return browser.eval('window.location.pathname + window.location.search')
      }, '/header?name=test&constructor=FormData&hidden-info=hi')
    })
  }
)
