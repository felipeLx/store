/*
 Function that resume information about the artist and type of art that she does: Mandalas with 'pontilhismo'.
*/
import React from 'react';

export default function AboutRoute() {
	return (
		<div className="container mx-auto px-4">
			<h1 className="text-2xl font-bold mb-4">Quem são os artistas</h1>
			<p className="mb-4">
				Olá, me chamo Alzira, sou uma artesã do Espírito Santo e tenho 60 anos. Juntos com alguns artistas locais decidimos mostrar nossos trabalhos que costumamos levar para as feiras de artesanato da região. Espero que gostem do meu trabalho e dos outros artistas que estão aqui.
			</p>
			<h2 className="text-xl font-bold mb-2">A Arte</h2>
			<p className="mb-4">As Mandalas têm origem na Índia e significam “círculo” em sânscrito. As mandalas são usadas em contextos religiosos, artísticos, terapêuticos e educacionais, pois representam a conexão entre o material e o espiritual, a harmonia, a criatividade e o equilíbrio.

			As mandalas podem ter diferentes formas, tamanhos e estilos, dependendo da cultura, da religião e da intenção de quem as cria. Algumas mandalas são feitas em areia, outras em tecido, papel, madeira, metal ou até mesmo na natureza. As cores e os elementos das mandalas também têm significados simbólicos, como os elementos da natureza, os animais, os números, as letras e os símbolos religiosos.</p>
			<h2 className="text-xl font-bold mb-2">Técnica Usada</h2>
			<p className="mb-4">A técnica de pontilhismo é uma forma de pintura que consiste em criar imagens usando pequenos pontos de cores diferentes. Esses pontos se misturam na visão do observador, criando a ilusão de cores secundárias e terciárias. A técnica de pontilhismo surgiu na França, no século XIX, como um movimento do impressionismo.
			</p>
			<h2 className="text-xl font-bold mb-2">Contato</h2>
			<p className="mb-4">Entre em contato. </p> <a className="text-blue-500" href="mailto:zizi.artesanato.es@gmail.com">Me envie um email</a>
		</div>
	)
}
