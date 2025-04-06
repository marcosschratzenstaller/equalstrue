// This file is generated. Do not modify it manually.
import { EqualsTrueIcon } from '../icon/icons';
import { ArrowUpRightIcon } from '../icon/icons';
import { ArrowsFullscreenIcon } from '../icon/icons';
import { BinocularsIcon } from '../icon/icons';
import { ChatIcon } from '../icon/icons';
import { CodeSlashIcon } from '../icon/icons';
import { CrosshairIcon } from '../icon/icons';
import { GraphUpArrowIcon } from '../icon/icons';
import { HandPeaceIcon } from '../icon/icons';
import { HandWavingIcon } from '../icon/icons';
import { ResizeIcon } from '../icon/icons';
import { RocketTakeoffIcon } from '../icon/icons';
import { SpeedometerIcon } from '../icon/icons';
import { StarIcon } from '../icon/icons';

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
		name: 'arrows-fullscreen',
		title: 'Arrows fullscreen',
		icon: ArrowsFullscreenIcon,
		attributes: { name: 'arrows-fullscreen' }
	},
	{
		isDefault: false,
		name: 'binoculars',
		title: 'Binoculars',
		icon: BinocularsIcon,
		attributes: { name: 'binoculars' }
	},
	{
		isDefault: false,
		name: 'chat',
		title: 'Chat',
		icon: ChatIcon,
		attributes: { name: 'chat' }
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
		name: 'crosshair',
		title: 'Crosshair',
		icon: CrosshairIcon,
		attributes: { name: 'crosshair' }
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
		name: 'hand-waving',
		title: 'Hand waving',
		icon: HandWavingIcon,
		attributes: { name: 'hand-waving' }
	},
	{
		isDefault: false,
		name: 'resize',
		title: 'Resize',
		icon: ResizeIcon,
		attributes: { name: 'resize' }
	},
	{
		isDefault: false,
		name: 'rocket-takeoff',
		title: 'Rocket takeoff',
		icon: RocketTakeoffIcon,
		attributes: { name: 'rocket-takeoff' }
	},
	{
		isDefault: false,
		name: 'speedometer',
		title: 'Speedometer',
		icon: SpeedometerIcon,
		attributes: { name: 'speedometer' }
	},
	{
		isDefault: false,
		name: 'star',
		title: 'Star',
		icon: StarIcon,
		attributes: { name: 'star' }
	}
];

variations.forEach((variation) => {
	if (variation.isActive) return;
	variation.isActive = (blockAttributes, variationAttributes) =>
		blockAttributes.name === variationAttributes.name;
});

export default variations;