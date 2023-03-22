import { db } from "./SQLite";

export function criaTabela() {
    db.transaction((transaction) => {
        transaction.executeSql('CREATE TABLE IF NOT EXISTS ' + 
            'Notas' + 
            '(id INTEGER PRIMARY KEY AUTOINCREMENT ,'+ 
            'titulo TEXT, ' + 
            'categoria TEXT, ' + 
            'texto TEXT);')
    })
}

export function adicionaNota(nota) {
    return new Promise((resolve, reject) => {
        db.transaction((transaction) => {
            transaction.executeSql('INSERT INTO Notas ' + 
            '(titulo, categoria, texto) VALUES (?, ?, ?);',
            [nota.titulo, nota.categoria, nota.texto],
            () => {
                
                resolve('Nota adicionada com sucesso!')
            },
            (transaction, error) => {
                console.log(error)
                reject(error)
            })
        })
       
    })
}

export function buscaNotas() {
    return new Promise((resolve, reject) => {
        db.transaction((transaction) => {
            transaction.executeSql('SELECT * FROM Notas;', [], 
            (transaction, resultado) => {
                resolve(resultado.rows._array)
            },
            (transaction, error) => {
                console.log(error)
                reject(error)
            })
        })
    })
}

export function removeTabela() {
    db.transaction((transaction) => {
        transaction.executeSql('DROP TABLE Notas;')
    })
}
