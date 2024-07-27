# **File System Project**

## **Descrição**

Este projeto demonstra o uso do módulo (fs) do Node.js. Inclui a implementação de classes para manipulação de arquivos e diretórios, bem como testes dos métodos principais.

### **Métodos Utilizados no Projeto**

#### **readFile('caminho/task.json', 'codificacao')**

Utilizado para ler o conteúdo de um arquivo de forma assíncrona. retorna uma promessa que, quando resolvida, contém o conteúdo do arquivo.

#### **writeFile('caminho/task.json', conteudo, 'codificacao')**

Utilizado para sobrescrever o conteúdo de um arquivo de forma assíncrona. Retorna uma promessa que, quando resolvida, indica que a operação foi concluída com sucesso.

#### **unlink('caminho/task.json')**

Utilizado para deletar um arquivo de forma assíncrona. Retorna uma promessa que, quando resolvida, indica que a operação foi concluída com sucesso.

#### **lstat('caminho/task.json')**

Utilizado para retornar as estatísticas de um arquivo ou diretório de forma assíncrona. Retorna uma promessa que, quando resolvida, fornece um objeto com as informações sobre o arquivo ou diretório.

#### **rename('caminho/task.json', 'caminho/novaTask.json')**

Utilizado para renomear um arquivo ou diretório.

caminhoAtual: O caminho atual para o arquivo ou diretório que você deseja renomear.

novoCaminho: O novo caminho e o novo nome para o arquivo ou diretório.


#### **watchFile(caminho/task.json, funcao(tipoDoEvento, nomeDoArquivo) => {})**

Utilizado para monitorar mudanças em um arquivo. A função  é chamada quando o arquivo é modificado.

#### **.watch(caminho/task.json, funcao(tipoDoEvento, nomeDoArquivo) => {})**

Monitora alterações em arquivos e diretórios. A função é chamada quando o arquivo é modificado ou quando há alterações no diretório monitorado.

#### **.unwatchFile(caminho/task.json, eventoAtivo)**

Remove a observação de alterações em um arquivo que foi iniciado com fs.watchFile. 

#### **.mkdir(caminho/pasta, { recursive: true })**

Cria um novo diretório no caminho especificado. O segundo parâmetro { recursive: true } serve para:

Permite a criação de diretórios pai que não existem ainda. Se o diretório especificado no caminho não existir, o Node.js criará todos os diretórios intermediários necessários. Sem essa opção, o método falharia se algum diretório intermediário estiver ausente.

Retorna uma promessa que, quando resolvida, indica que a operação foi concluída com sucesso.

#### **readdir(caminho/pasta)**

Utilizado para listar o conteúdo do diretório.

retorna uma promessa que, quando resolvida, contém o conteúdo do diretório.

#### **rm(caminho/pasta, { recursive: true, force: true })**

Utilizado para deletar o diretório especificado.

{ recursive: true }: Permite a exclusão do diretório e de todos os seus subdiretórios e arquivos. Sem essa opção, a função falhará se o diretório contiver arquivos ou outros diretórios.

{ force: true }: Força a exclusão do diretório, ignorando erros, como a ausência do diretório.

Retorna uma promessa que, quando resolvida, indica que a operação foi concluída com sucesso.

#### **fs.glob(valorDeBusca, funcao(error, valorEncontrado) => {})**
   
Utilizado para buscar arquivos ou diretórios que correspondem ao padrão especificado.

valorDeBusca: O padrão de busca.

funcao(error, valorEncontrado): Função de callback que é chamada quando a busca é concluída.

Retorna uma promessa que, quando resolvida, fornece um array com os caminhos dos arquivos e diretórios que correspondem ao padrão especificado.

#### **cp('caminho/pasta', 'novoCaminho/pasta', { recursive: true })**

Utilizado para copiar o conteúdo de um diretório para um novo caminho.

caminho/pasta: O caminho do diretório que você deseja copiar.

novoCaminho/pasta: O caminho onde você deseja colar o diretório copiado.

{ recursive: true }: Permite a cópia recursiva do diretório, incluindo todos os subdiretórios e arquivos. Sem essa opção, a cópia falhará se o diretório contiver subdiretórios ou arquivos.

Retorna uma promessa que, quando resolvida, indica que a operação foi concluída com sucesso.



