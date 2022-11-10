import BaseProperty from './BaseProperty';

export default class InlineJustificator extends BaseProperty {

	constructor() {
		super( 'inlineJustificator', null, false );

		/**
		 *
		 * @type {Lines}
		 * @private
		 */
		this._value = null;
	}


	/* eslint-disable no-unused-vars */ update( element, out ) { /* eslint-enable no-unused-vars */ }

	/**
	 *
	 * @override
	 */
	process( element ) {


		const INNER_HEIGHT = element._bounds._innerHeight;
		const lines = element._layouter._value;

		const textHeight = Math.abs( lines.height );


		// Line vertical positioning
		let justificationOffset = ( () => {

			switch ( element._alignItems._value ) {

				case 'inherit':
				case 'start':
					// return ( INNER_HEIGHT / 2 ) - lines[ 0 ].lineHeight - boxComponent._padding.x ;
					// return boxComponent._padding.x - lines[0].lineHeight ;
					// return (INNER_HEIGHT * .5) + boxComponent._padding.x - (lines[0].lineHeight * .5);
					// return (INNER_HEIGHT * .5) - lines[0].lineHeight + lines[0].y;
					// return (INNER_HEIGHT * .5) - lines[0].lineHeight;
					return (INNER_HEIGHT * .5) - lines[0].lineHeight + lines[0].y;

				case 'end':
					// return textHeight - lines[ 0 ].lineHeight - ( INNER_HEIGHT / 2 );
					return textHeight - lines[ 0 ].lineHeight + lines[0].y - ( INNER_HEIGHT / 2 );


				case 'stretch': // @TODO : Stretch should trigger an error in own property
				case 'center':
					return ( textHeight / 2 ) - lines[ 0 ].lineHeight + lines[0].y;

			}
		} )();

		//console.log( justificationOffset );

		// Apply padding
		const padding = element._padding._value;
		const border = element._borderWidth._value;

		justificationOffset += ( - padding.x + padding.z ) / 2 + ( - border.x + border.z ) / 2;

		//

		lines.forEach( ( line ) => {

			line.y += justificationOffset;

			line.forEach( ( inline ) => {

				inline.offsetY += justificationOffset;

			} );

		} );

	}

}
