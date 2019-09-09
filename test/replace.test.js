const {expect} = require('chai')
const {replaceTag, replaceAllSemicolon} = require('../src/replace')

describe('Replace', () => {
    it('success 100%', () => {
        expect(1 + 1).equal(2)
    })

    context('replaceAllSemicolon', () => {
        it('should replace all ` in html source', () => {
            const input = '`a b`c'
            const result = replaceAllSemicolon(input)
            expect(result).equal('\\`a b\\`c')
        })
    })

    context('replaceTag', () => {
        it('should replace img src attr in require(src)', () => {
            const input = `<img src="./assets/1.png" alt=""/>`

            const result = replaceTag(input)

            expect(result).equal(`<img src="\` + require('./assets/1.png') + \`" alt=""/>`)
        })

        it('should replace link href attr in require(href)', () => {
            const input = `<link href="./assets/1.css" />`

            const result = replaceTag(input)

            expect(result).equal(`<link href="\` + require('./assets/1.css') + \`" />`)
        })

        it('should stay the same when tag has no replace attr', () => {
            const input = `<h1 class="title">normal title</h1>`

            const result = replaceTag(input)

            expect(result).equal(input)
        })

        it('should work when tag end in > instead of />', () => {
            const input = `<img src="./assets/1.png" alt="">`

            const result = replaceTag(input)

            expect(result).equal(`<img src="\` + require('./assets/1.png') + \`" alt="">`)
        })

        it('should work when attr around with \' instead of \"', () => {
            const input = `<img src='./assets/1.png' alt="">`

            const result = replaceTag(input)

            expect(result).equal(`<img src="\` + require('./assets/1.png') + \`" alt="">`)
        })

        it('should work when tag has more than one attr should be replaced', () => {
            const input = `<img src="./assets/placeholder.png" data-src="./assets/1.png" alt="">`

            const result = replaceTag(input)

            expect(result).equal(`<img src="\` + require('./assets/placeholder.png') + \`" data-src="\` + require('./assets/1.png') + \`" alt="">`)
        })

    })
})

