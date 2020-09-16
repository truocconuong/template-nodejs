module.exports.questions = [
    {
        title: "Have you taken vitamins and/or supplements in the past?",
        question_short: 'vitamins_past',
        answers: [
            {
                products : ['zinc','biotin'],
                title: 'For a while'
            },
            {
                title: 'On and off'
            }
        ]
    },
    {
        title: "What about your skin?",
        question_short: 'skin',
        answers: [
            {
                products : ['vitaminc','biotin','b-complex'],
                title: 'Dryness'
            },
            {
                title: 'General ageing'
            }
        ]
    },
    {
        title: "How often do you eat meat?",
        question_short: 'eat',
        answers: [
            {
                products : ['b-complex'],
                title: 'Rarely'
            },
            {
                title: 'Three times per week or more'
            }
        ]
    }
]
