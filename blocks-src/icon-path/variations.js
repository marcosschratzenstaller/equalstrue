// This file is generated. Do not modify it manually.
import { EqualsTrueIcon } from '../icon/icons';
import { ArrowUpRightIcon } from '../icon/icons';

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
	}
];

variations.forEach((variation) => {
	if (variation.isActive) return;
	variation.isActive = (blockAttributes, variationAttributes) =>
		blockAttributes.name === variationAttributes.name;
});

export default variations;