// This file is generated. Do not modify it manually.
import { EqualsTrueIcon } from '../icon/icons';
import { ArrowUpRightIcon } from '../icon/icons';
import { CodeSlashIcon } from '../icon/icons';
import { GraphUpArrowIcon } from '../icon/icons';
import { HandPeaceIcon } from '../icon/icons';
import { RocketTakeoffIcon } from '../icon/icons';

const variations = [
	{
		isDefault: true,
		name: 'equalstrue',
		title: 'Equals True',
		icon: EqualsTrueIcon,
		attributes: { name: 'equalstrue' }
	},
	{
		isDefault: false,
		name: 'arrow-up-right',
		title: 'Arrow up right',
		icon: ArrowUpRightIcon,
		attributes: { name: 'arrow-up-right' }
	},
	{
		isDefault: false,
		name: 'code-slash',
		title: 'Code slash',
		icon: CodeSlashIcon,
		attributes: { name: 'code-slash' }
	},
	{
		isDefault: false,
		name: 'graph-up-arrow',
		title: 'Graph up arrow',
		icon: GraphUpArrowIcon,
		attributes: { name: 'graph-up-arrow' }
	},
	{
		isDefault: false,
		name: 'hand-peace',
		title: 'Hand peace',
		icon: HandPeaceIcon,
		attributes: { name: 'hand-peace' }
	},
	{
		isDefault: false,
		name: 'rocket-takeoff',
		title: 'Rocket takeoff',
		icon: RocketTakeoffIcon,
		attributes: { name: 'rocket-takeoff' }
	}
];

variations.forEach((variation) => {
	if (variation.isActive) return;
	variation.isActive = (blockAttributes, variationAttributes) =>
		blockAttributes.name === variationAttributes.name;
});

export default variations;