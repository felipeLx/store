/*
 Function that resume information about the artist and type of art that she does: Mandalas with 'pontilhismo'.
*/
import React from 'react';

export default function AboutRoute() {
	return (
		<>
		<div className="container mx-auto px-4">
			<h1 className="text-2xl font-bold mb-4">Quem são os artistas</h1>
			<div className="flex flex-col mb-4 overflow-visible">
				<div className="flex justify-around p-2">
					<img className="flex rounded-full mb-4 w-[250px]" src="/images/alzira.jpg" alt="Artistas" />
					<p className="flex m-4 p-2">
						Olá, me chamo Alzira, sou uma artesã do Espírito Santo e tenho 60 anos. Juntos com alguns artistas locais decidimos mostrar nossos trabalhos que costumamos levar para as feiras de artesanato da região. Espero que gostem do meu trabalho e dos outros artistas que estão aqui.
					</p>
				</div>
				
			</div>
			<h2 className="text-xl font-bold mb-2">A Arte</h2>
			<p className="mb-4">As Mandalas têm origem na Índia e significam “círculo” em sânscrito. As mandalas são usadas em contextos religiosos, artísticos, terapêuticos e educacionais, pois representam a conexão entre o material e o espiritual, a harmonia, a criatividade e o equilíbrio.

			As mandalas podem ter diferentes formas, tamanhos e estilos, dependendo da cultura, da religião e da intenção de quem as cria. Algumas mandalas são feitas em areia, outras em tecido, papel, madeira, metal ou até mesmo na natureza. As cores e os elementos das mandalas também têm significados simbólicos, como os elementos da natureza, os animais, os números, as letras e os símbolos religiosos.</p>
			<h2 className="text-xl font-bold mb-2">Técnica Usada</h2>
			<p className="mb-4">A técnica de pontilhismo é uma forma de pintura que consiste em criar imagens usando pequenos pontos de cores diferentes. Esses pontos se misturam na visão do observador, criando a ilusão de cores secundárias e terciárias. A técnica de pontilhismo surgiu na França, no século XIX, como um movimento do impressionismo.
			</p>
			<h2 className="text-xl font-bold mb-2">Contato</h2>
			<p className="mb-4">Entre em contato. </p> <a className="text-blue-500" href="mailto:zizi.artesanato.es@gmail.com">Me envie um email</a>
		</div>
		<div className="container mx-auto px-4">
			<div className="flex flex-col mb-4 overflow-visible">
				<div className="flex justify-around p-2">
					<p className="flex m-4 p-2">
					Olá, me chamo Ricardo, Artista Plástico profissional desde 1977. Com exposições coletivas, individuais, participações e salões de artes, projetos especiais e eventos ligados as artes plásticas e visuais. As duas linhas de trabalhos (Máscaras e esculturas) tem como base o mesmo material, matéria prima e processo produtivo, técnica e estilo. O que os diferencia são; tamanho das peças, uso/ aplicação.
					</p>
					<img className="flex rounded-full mb-4 max-w-[250px]" src="/images/ricardo.jpg" alt="Artistas" />
				</div>
				<h2 className="text-xl font-bold mb-2">A Arte</h2>
				<p className="mb-4">Com estilo pessoal e original prevalece num grafismo do qual a cor serpenteia e pontilha com harmonia e liberdade. As texturas vão surgindo 
				graciosamente, espontâneas, tão livres que buscam o céu repleto de luzes ofuscado pela intensificação do sol. 
				O sol é sua vida e essencialmente preciso na beleza dessas composições que representam como fabulações o atraente folclore, vive os seus 
				temas, convive com eles, pinta como simplesmente conta seus “causos”, compondo cenas de cor dele executadas com refinado senso de humor 
				por identificação natural, pois pertence a forte linhagem nordestina. 
				É um artista que procura captar com muita sensibilidade o que ainda existe de ingênuo e puro na alma do povo.
				Sua pintura equilibrada, realisticamente documental revela invulgar dotes ao procurar nas cores uma maneira consciente e correta de expressar, de 
				falar das dores, alegrias e sentimentos de nossa gente.</p>
				<h2 className="text-xl font-bold mb-2">Contato</h2>
				<p className="mb-4">Entre em contato. </p> <a className="text-blue-500" href="mailto:ricaru@gmail.com">Me envie um email</a>
			</div>
		</div>
	</>
	)
}

/*
Com estilo pessoal e original prevalece num grafismo do qual a cor serpenteia e pontilha com harmonia e liberdade. As texturas vão surgindo 
graciosamente, espontâneas, tão livres que buscam o céu repleto de luzes ofuscado pela intensificação do sol. 
O sol é sua vida e essencialmente preciso na beleza dessas composições que representam como fabulações o atraente folclore, vive os seus 
temas, convive com eles, pinta como simplesmente conta seus “causos”, compondo cenas de cor dele executadas com refinado senso de humor 
por identificação natural, pois pertence a forte linhagem nordestina. 
É um artista que procura captar com muita sensibilidade o que ainda existe de ingênuo e puro na alma do povo.
Sua pintura equilibrada, realisticamente documental revela invulgar dotes ao procurar nas cores uma maneira consciente e correta de expressar, de 
falar das dores, alegrias e sentimentos de nossa gente.
*/