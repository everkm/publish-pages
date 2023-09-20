function getEntrypoint() {
  return {
    main: ['./src/main.ts'],
    download: ['./src/download.ts'],
    book: ['./src/book.ts'],
  }
}

module.exports = {
  getEntrypoint,
}
